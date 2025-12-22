const fs = require('fs');
const path = require('path');

function walk(dir){
  let results = [];
  const list = fs.readdirSync(dir, { withFileTypes: true });
  list.forEach((d) => {
    const full = path.join(dir, d.name);
    if(d.isDirectory()){
      results = results.concat(walk(full));
    } else {
      if(/\.mdx?$/.test(d.name) || d.name === 'index.md') results.push(full);
    }
  });
  return results;
}

const docsRoot = path.resolve(__dirname, '..', 'docs');
const i18nRoot = path.resolve(__dirname, '..', 'i18n', 'ur', 'docusaurus-plugin-content-docs', 'current');

function relPaths(root, files){
  return files.map(f => path.relative(root, f).replace(/\\\\/g, '/'));
}

let docsFiles = [];
let i18nFiles = [];
try{
  docsFiles = walk(docsRoot);
} catch(e){
  console.error('Error reading docs:', e.message);
  process.exit(2);
}
try{
  i18nFiles = walk(i18nRoot);
} catch(e){
  // If i18n ur folder doesn't exist or empty, continue
  i18nFiles = [];
}

const docsRel = relPaths(docsRoot, docsFiles);
const i18nRel = relPaths(i18nRoot, i18nFiles);

const missing = docsRel.filter(p => !i18nRel.includes(p));

console.log(JSON.stringify({ totalDocs: docsRel.length, totalUr: i18nRel.length, missingCount: missing.length, missingFiles: missing.slice(0,200) }, null, 2));
