import React, { useState } from 'react';
import { Languages, Loader2, RotateCcw } from 'lucide-react';
import { useLocation } from '@docusaurus/router';

const AITranslateButton = () => {
    const [isTranslating, setIsTranslating] = useState(false);
    const [isTranslated, setIsTranslated] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const location = useLocation();

    const handleTranslate = async () => {
        setIsTranslating(true);
        setError(null);

        // Target the main documentation content area
        const contentArea = document.querySelector('.theme-doc-markdown');
        if (!contentArea) {
            setError('Could not find content to translate.');
            setIsTranslating(false);
            return;
        }

        const originalHTML = contentArea.innerHTML;
        const textToTranslate = contentArea.innerText;

        try {
            const response = await fetch('http://localhost:8000/api/v1/translate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    text: textToTranslate,
                    targetLanguage: 'Urdu'
                }),
            });

            if (!response.ok) throw new Error('Translation failed');

            const data = await response.json();

            // Store original content if not already stored
            if (!(window as any).__originalDocContent) {
                (window as any).__originalDocContent = originalHTML;
            }

            // Replace content with translation
            // Note: This is a direct DOM manipulation which is not ideal in React,
            // but since we are translating static Markdown content in Docusaurus, it's effective.
            contentArea.innerHTML = `<div dir="rtl" class="urdu-translation" style="font-family: 'Noto Nastaliq Urdu', serif; line-height: 2;">${data.translation.replace(/\n/g, '<br/>')}</div>`;

            setIsTranslated(true);
        } catch (err: any) {
            setError('Translation error. Please try again.');
            console.error(err);
        } finally {
            setIsTranslating(false);
        }
    };

    const handleReset = () => {
        const contentArea = document.querySelector('.theme-doc-markdown');
        if (contentArea && (window as any).__originalDocContent) {
            contentArea.innerHTML = (window as any).__originalDocContent;
            setIsTranslated(false);
        }
    };

    // Only show on doc pages
    if (!location.pathname.startsWith('/docs/')) return null;

    return (
        <div className="flex flex-col gap-2 mb-6">
            <div className="flex items-center gap-3">
                {!isTranslated ? (
                    <button
                        onClick={handleTranslate}
                        disabled={isTranslating}
                        className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
                    >
                        {isTranslating ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                            <Languages className="w-4 h-4" />
                        )}
                        {isTranslating ? 'Translating to Urdu...' : 'AI Translate to Urdu'}
                    </button>
                ) : (
                    <button
                        onClick={handleReset}
                        className="flex items-center gap-2 bg-slate-200 hover:bg-slate-300 text-slate-800 px-4 py-2 rounded-lg transition-all shadow-md text-sm font-medium"
                    >
                        <RotateCcw className="w-4 h-4" />
                        Reset to English
                    </button>
                )}

                {error && <span className="text-red-500 text-xs font-medium">{error}</span>}
            </div>
            {isTranslated && (
                <p className="text-[10px] text-slate-500 italic">
                    AI-powered translation. Technical terms may remain in English for accuracy.
                </p>
            )}
        </div>
    );
};

export default AITranslateButton;
