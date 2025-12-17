# GitHub Pages Deployment Guide

This guide explains how to deploy your AI for Humanity book to GitHub Pages.

## Prerequisites

1. Make sure your repository is set up at: `https://github.com/HasnainSolangi/ai-for-humanity-book.git`
2. Ensure your `docusaurus.config.ts` is properly configured with:
   - `url: 'https://HasnainSolangi.github.io'`
   - `baseUrl: '/ai-for-humanity/'`
   - `organizationName: 'HasnainSolangi'`
   - `projectName: 'ai-for-humanity'`
3. You have Git installed and configured with your GitHub credentials
4. You have push access to the repository
5. If using 2FA, create a Personal Access Token (PAT) with `public_repo` scope

## Deployment Steps

### Option 1: Using the Deployment Script (Recommended)

1. Make sure you have Node.js and npm installed
2. Run the deployment script:
   ```bash
   # On Windows
   ./deploy-github-pages.sh

   # Or if using Git Bash
   bash deploy-github-pages.sh
   ```
3. After the script completes, follow the instructions to add the remote and push to GitHub:
   ```bash
   cd build
   git remote add origin https://github.com/HasnainSolangi/ai-for-humanity-book.git
   git push -f origin HEAD:gh-pages
   ```

### Option 2: Manual Deployment

1. Build your site:
   ```bash
   npm run build
   ```

2. Navigate to the build folder:
   ```bash
   cd build
   ```

3. Initialize git and add remote:
   ```bash
   git init
   git remote add origin https://github.com/HasnainSolangi/ai-for-humanity-book.git
   ```

4. Add and commit files:
   ```bash
   git add .
   git config --local user.email "your-email@example.com"
   git config --local user.name "Your Name"
   git commit -m "Deploy to GitHub Pages"
   ```

5. Push to gh-pages branch:
   ```bash
   git push -f origin HEAD:gh-pages
   ```

## GitHub Actions (Alternative Automated Approach)

You can also set up GitHub Actions for automatic deployment. Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    name: Deploy to GitHub Pages
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: npm

      - name: Install dependencies
        run: npm install

      - name: Build website
        run: npm run build

      # Popular action to deploy to GitHub Pages:
      # Docs: https://github.com/peaceiris/actions-gh-pages#%EF%B8%8F-docusaurus
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./build
```

## Verification

After deployment, your site will be available at: `https://HasnainSolangi.github.io/ai-for-humanity/`

Note: It may take a few minutes for the changes to propagate.

## Configuration Notes

- The `baseUrl: '/ai-for-humanity/'` in `docusaurus.config.ts` matches your repository name
- GitHub Pages serves content from the `gh-pages` branch
- The site is configured to support both English and Urdu languages
- Dark mode is supported and will work on GitHub Pages

## Troubleshooting

If your site doesn't appear after deployment:

1. Check that GitHub Pages is enabled in your repository settings
2. Verify that the `baseUrl` in `docusaurus.config.ts` matches your repository name
3. Ensure the deployment was pushed to the correct branch (`gh-pages`)
4. Check that there are no custom domain settings conflicting with the GitHub Pages URL

### Authentication Issues

If you encounter a permission error like:
```
remote: Permission to username/repo.git denied to another-account.
fatal: unable to access 'https://github.com/username/repo.git/': The requested URL returned error: 403
```

This means Git is using credentials for a different account. To fix this:

1. **Clear stored credentials** (Windows):
   - Open Credential Manager
   - Go to Windows Credentials/Windows Vault
   - Remove any entries related to GitHub

2. **Use a Personal Access Token (PAT)** instead of password:
   - Generate a PAT on GitHub with `public_repo` scope
   - When prompted for password, use the PAT instead

3. **Re-authenticate**:
   - Git will prompt for credentials again
   - Enter your GitHub username and PAT