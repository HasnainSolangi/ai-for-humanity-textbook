import os
import re

def get_docusaurus_url(filepath: str) -> str:
    # Normalize path separators
    filepath = filepath.replace("\\", "/")
    # Find part after 'docs/'
    if "docs/" in filepath:
        rel_path = filepath.split("docs/")[-1]
    else:
        rel_path = filepath
    
    # Remove extension
    rel_path = rel_path.replace(".md", "")
    
    # Docusaurus usually strips the number prefixes (e.g. 01-lesson -> lesson)
    # We'll do a simple heuristic: remove "digits-" from start of segments
    segments = rel_path.split("/")
    clean_segments = []
    for seg in segments:
        code_clean = re.sub(r'^\d+-', '', seg)
        clean_segments.append(code_clean)
        
    return "/ai-for-humanity-textbook/" + "/".join(clean_segments)

def get_markdown_title(filepath: str) -> str:
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            for line in f:
                if line.strip().startswith('# '):
                    return line.strip().replace('# ', '').strip()
    except Exception:
        pass
    # Fallback to filename
    return os.path.basename(filepath).replace(".md", "")

def build_toc(docs_path: str = "docs"):
    """
    Scans the docs directory and returns a string formatted as:
    - [Title](URL)
    """
    toc_lines = []
    
    for root, dirs, files in os.walk(docs_path):
        for file in files:
            if file.endswith(".md"):
                full_path = os.path.join(root, file)
                title = get_markdown_title(full_path)
                url = get_docusaurus_url(full_path)
                
                # Check if it's a "Lesson" or "Chapter"
                # We can format it nicely
                toc_lines.append(f"- [{title}]({url})")
                
    return "\n".join(toc_lines)

if __name__ == "__main__":
    print(build_toc())
