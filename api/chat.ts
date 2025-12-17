import type { VercelRequest, VercelResponse } from '@vercel/node';
import { QdrantClient } from '@qdrant/js-client-rest';
import { CohereClient } from 'cohere-ai';

// Initialize clients
const qdrantClient = new QdrantClient({
    url: process.env.QDRANT_URL || '',
    apiKey: process.env.QDRANT_API_KEY || '',
});

const cohere = new CohereClient({
    token: process.env.COHERE_API_KEY || '',
});

const COLLECTION_NAME = process.env.QDRANT_COLLECTION_NAME || 'textbook_rag';

interface ChatRequest {
    question: string;
}

interface QdrantPayload {
    page_content?: string;
    metadata?: {
        source?: string;
        filename?: string;
    };
}

export default async function handler(
    req: VercelRequest,
    res: VercelResponse
) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { question } = req.body as ChatRequest;

        if (!question || typeof question !== 'string') {
            return res.status(400).json({ error: 'Question is required' });
        }

        // Handle greetings
        const greetingPatterns = ['hi', 'hello', 'hey', 'greetings', 'salam', 'assalam', 'good morning', 'good afternoon', 'good evening'];
        const questionLower = question.toLowerCase().trim();

        for (const pattern of greetingPatterns) {
            if (questionLower.includes(pattern)) {
                const greeting = questionLower.includes('salam') || questionLower.includes('assalam')
                    ? "Walaikum assalam! Welcome to the AI for Humanity textbook. How can I assist you with navigating or understanding the content today?"
                    : "Hello! Welcome to the AI for Humanity textbook. How can I assist you with navigating or understanding the content today?";

                return res.status(200).json({ answer: greeting });
            }
        }

        // Generate embedding for the question
        const embedResponse = await cohere.embed({
            texts: [question],
            model: 'embed-english-v3.0',
            inputType: 'search_query',
        });

        const queryVector = embedResponse.embeddings[0];

        // Search Qdrant
        const searchResults = await qdrantClient.search(COLLECTION_NAME, {
            vector: queryVector,
            limit: 5,
        });

        // Format context from search results
        const contextDocs = searchResults.map(result => {
            const payload = result.payload as QdrantPayload || {};
            const metadata = payload.metadata || {};
            const sourceFile = metadata.source || 'unknown';
            const filename = metadata.filename || '';
            const content = payload.page_content || '';

            return `Source: ${sourceFile}\nFilename: ${filename}\nContent: ${content}`;
        }).join('\n\n');

        // Generate response using Cohere
        const chatResponse = await cohere.chat({
            message: question,
            model: 'command-r-08-2024',
            temperature: 0,
            preamble: `ROLE: AI Librarian for "AI for Humanity" textbook.

RULES:
1. Answer ONLY from the provided context from the book
2. If the answer isn't in the context, say "I couldn't find that information in the AI for Humanity textbook."
3. Be helpful and provide relevant chapter references when possible
4. Keep responses clear and concise

Context from the book:
${contextDocs}`,
        });

        const answer = chatResponse.text || "I'm sorry, I couldn't generate a response.";

        return res.status(200).json({ answer });

    } catch (error: any) {
        console.error('Chat API Error:', error);
        return res.status(500).json({
            error: 'Failed to process question',
            details: error.message
        });
    }
}
