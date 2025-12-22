const fs = require('fs');
const path = require('path');

const API_URL = 'http://localhost:8000/api/v1/translate';
const SOURCE_DIR = 'docs';
const TARGET_DIR = 'i18n/ur/docusaurus-plugin-content-docs/current';

async function translateText(text) {
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
            console.error(`Translation failed for content.`);
            return text;
        }

        const data = await response.json();
        return data.translation;
    } catch (error) {
        console.error(`Error translating: ${error}`);
        return text;
    }
}

function getAllFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);
    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function (file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
        } else {
            if (file.endsWith('.md') || file.endsWith('.mdx')) {
                arrayOfFiles.push(path.join(dirPath, "/", file));
            }
        }
    });

    return arrayOfFiles;
}

async function translateMarkdownFile(filePath) {
    const relativePath = path.relative(SOURCE_DIR, filePath);
    const targetPath = path.join(TARGET_DIR, relativePath);
    const targetDir = path.dirname(targetPath);

    if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
    }

    console.log(`Translating ${filePath} -> ${targetPath}...`);
    const content = fs.readFileSync(filePath, 'utf-8');

    // Frontmatter handling (optional but better to skip or translate partially)
    // For now, let's translate the whole thing or split by sections if too large.
    // Cohere Command R can handle fairly large contexts.

    const translatedContent = await translateText(content);

    // Ensure the translated content has RTL markers if needed, 
    // though Docusaurus handles RTL via config mostly.

    fs.writeFileSync(targetPath, translatedContent, 'utf-8');
    console.log(`Finished translating ${filePath}`);
}

async function main() {
    const files = getAllFiles(SOURCE_DIR);
    console.log(`Found ${files.length} markdown files to translate.`);

    for (const file of files) {
        await translateMarkdownFile(file);
        // Small delay
        await new Promise(resolve => setTimeout(resolve, 200));
    }
}

main().catch(console.error);
