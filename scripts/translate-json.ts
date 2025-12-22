import fs from 'fs';
import path from 'path';

const API_URL = 'http://localhost:8000/api/v1/translate';

async function translateText(text: string): Promise<string> {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                text: text,
                targetLanguage: 'Urdu'
            }),
        });

        if (!response.ok) {
            console.error(`Translation failed for: ${text.substring(0, 50)}...`);
            return text; // Fallback to original
        }

        const data = await response.json() as { translation: string };
        return data.translation;
    } catch (error) {
        console.error(`Error translating: ${error}`);
        return text;
    }
}

async function translateJsonFile(filePath: string) {
    console.log(`Translating ${filePath}...`);
    const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const entries = Object.entries(content);

    for (let i = 0; i < entries.length; i++) {
        const [key, value] = entries[i] as [string, { message: string, description?: string }];
        // Skip translating if it looks like a URL or is already translated (optional check)
        if (value.message.startsWith('http') || value.message.startsWith('mailto')) continue;

        console.log(`[${i + 1}/${entries.length}] Translating: ${value.message}`);
        const translated = await translateText(value.message);
        content[key].message = translated;

        // Add a small delay to avoid overwhelming the backend/API
        await new Promise(resolve => setTimeout(resolve, 100));
    }

    fs.writeFileSync(filePath, JSON.stringify(content, null, 2), 'utf-8');
    console.log(`Finished translating ${filePath}`);
}

async function main() {
    const files = [
        'i18n/ur/docusaurus-theme-classic/navbar.json',
        'i18n/ur/docusaurus-theme-classic/footer.json',
        // 'i18n/ur/code.json' // Maybe too big for one go, let's start with these
    ];

    for (const file of files) {
        const fullPath = path.resolve(process.cwd(), file);
        if (fs.existsSync(fullPath)) {
            await translateJsonFile(fullPath);
        } else {
            console.warn(`File not found: ${file}`);
        }
    }
}

main().catch(console.error);
