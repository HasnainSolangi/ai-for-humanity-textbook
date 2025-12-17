#!/bin/bash

# GitHub Pages Deployment Script for AI for Humanity Book
# This script builds the Docusaurus site and prepares it for GitHub Pages deployment

set -e  # Exit immediately if a command exits with a non-zero status

echo "Building Docusaurus site for GitHub Pages..."

# Build the site
npm run build

# Navigate to the build output directory
cd build

# Initialize a new git repository
git init

# Add all files
git add .

# Configure git identity
git config --local user.email "your-email@example.com"
git config --local user.name "Your Name"

# Commit the changes
git commit -m "Deploy to GitHub Pages"

echo "Build completed successfully in the 'build' directory!"
echo ""
echo "To complete the GitHub Pages deployment:"
echo "1. Add your GitHub repository as remote: git remote add origin https://github.com/HasnainSolangi/ai-for-humanity-book.git"
echo "2. Push to the gh-pages branch: git push -f origin HEAD:gh-pages"
echo ""
echo "Your site will be available at: https://HasnainSolangi.github.io/ai-for-humanity/"
echo ""
echo "Note: You may need to enable GitHub Pages in your repository settings:"
echo "Settings > Pages > Source: Deploy from a branch > Branch: gh-pages"