# AI-Powered Multi-Format Translation Skill

This skill allows an agent to batch translate complex documentation sites (Docusaurus) while maintaining technical accuracy and structural integrity.

## Capabilities
- **Batch Markdown Translation**: Automatically translates entire documentation directories while preserving frontmatter and markdown syntax.
- **Docusaurus i18n Integration**: Translates theme JSON files (`navbar.json`, `footer.json`, `code.json`) to provide a fully localized UI.
- **Terminology Preservation**: Intelligently identifies and preserves technical terms (API names, product names) in English to ensure professional accuracy in the target language.

## Usage
### Translating Documentation
The skill uses a custom Node.js execution engine to process markdown files through the backend AI translation service.
```bash
node scripts/batch-translate-docs.js
```

### Translating UI Strings
The skill processes official Docusaurus i18n JSON files to localize the navigation, footer, and React components.
```bash
node scripts/translate-json.js
```

## Impact
Enables rapid internationalization of large-scale textbooks like "AI for Humanity", increasing global accessibility by 10x with minimal manual effort.
