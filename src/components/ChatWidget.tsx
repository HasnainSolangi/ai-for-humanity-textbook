import React, { useState, useRef, useEffect } from 'react';
import { Send, MessageSquare, X, Sparkles, Bot } from 'lucide-react';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant', content: string }[]>([
    { role: 'assistant', content: "Hello! I'm your AI for Humanity textbook assistant. Ask me anything about the book!" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedContext, setSelectedContext] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Listen for text selection changes
  useEffect(() => {
    const handleSelectionChange = () => {
      const selection = window.getSelection();
      const text = selection ? selection.toString().trim() : '';
      if (text.length > 0) {
        setSelectedContext(text);
      }
    };

    document.addEventListener('selectionchange', handleSelectionChange);
    return () => document.removeEventListener('selectionchange', handleSelectionChange);
  }, []);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleHeaderClose = () => {
    setShowExitConfirm(true);
  };

  const handleConfirmExit = (shouldClear: boolean) => {
    if (shouldClear) {
      setMessages([
        { role: 'assistant', content: "Hello! I'm your AI for Humanity textbook assistant. Ask me anything about the book!" }
      ]);
    }
    setIsOpen(false);
    setShowExitConfirm(false);
  };

  const handleStop = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
      setIsLoading(false);
      setMessages(prev => [...prev, { role: 'assistant', content: "[Stopped by user]" }]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    // Create new AbortController
    const controller = new AbortController();
    abortControllerRef.current = controller;

    const isProduction = process.env.NODE_ENV === 'production';
    const apiUrl = isProduction ? '/api/chat' : 'http://localhost:8000/api/v1/chat';

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: userMsg,
          selectedText: selectedContext
        }),
        signal: controller.signal
      });

      if (!response.ok) throw new Error('Network response was not ok');

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.answer }]);
    } catch (error: any) {
      if (error.name === 'AbortError') {
        console.log('Request aborted');
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: "I'm having trouble connecting to the backend. Make sure the Python backend is running on port 8000." }]);
      }
    } finally {
      // Only turn off loading if we weren't aborted (handled in handleStop) 
      // OR if we finished normally. 
      // If aborted, handleStop does the cleanup.
      if (abortControllerRef.current === controller) {
        setIsLoading(false);
        abortControllerRef.current = null;
      }
    }
  };

  return (
    <div className="sticky bottom-4 sm:bottom-8 ml-auto mr-4 sm:mr-8 z-[9999] font-sans">
      <style>{`
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
      `}</style>

      {isOpen && (
        <div className="absolute bottom-[4.5rem] right-0 w-[calc(100vw-2rem)] sm:w-[340px] h-[500px] max-h-[70vh] bg-white/95 backdrop-blur-20 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 flex flex-col overflow-hidden animate-slideUp origin-bottom-right">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-500 p-6 text-white flex justify-between items-center relative">
            <div className="font-bold text-lg flex items-center gap-2">
              <Bot size={20} />
              <span>AI Tutor Assistant</span>
            </div>
            <button
              onClick={handleHeaderClose}
              className="bg-white/20 border-0 cursor-pointer p-1.5 rounded-full flex hover:bg-white/30 transition-colors"
            >
              <X size={18} className="text-white" />
            </button>

            {/* Exit Confirmation Overlay */}
            {showExitConfirm && (
              <div className="absolute inset-0 bg-slate-900/90 flex flex-col items-center justify-center gap-4 text-center p-6 z-50 animate-fadeIn rounded-t-3xl backdrop-blur-sm">
                <h3 className="m-0 text-white text-lg font-semibold">End Session?</h3>
                <p className="m-0 text-slate-300 text-sm">Do you want to clear your chat history?</p>
                <div className="flex gap-3 w-full mt-2">
                  <button
                    onClick={() => handleConfirmExit(true)}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-xl border-0 font-medium cursor-pointer transition-colors"
                  >
                    Yes, Clear
                  </button>
                  <button
                    onClick={() => handleConfirmExit(false)}
                    className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-2 px-4 rounded-xl border-0 font-medium cursor-pointer transition-colors"
                  >
                    No, Minimize
                  </button>
                </div>
                <button
                  onClick={() => setShowExitConfirm(false)}
                  className="text-slate-400 hover:text-white text-xs underline cursor-pointer border-0 bg-transparent"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 bg-slate-50 dark:bg-slate-900">
            {selectedContext && (
              <div className="bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800 p-3 rounded-xl animate-fadeIn relative mb-2">
                <div className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-1 px-1">Selected Text Context</div>
                <div className="text-xs text-slate-600 dark:text-slate-300 italic line-clamp-3">"{selectedContext}"</div>
                <button
                  onClick={() => setSelectedContext('')}
                  className="absolute top-2 right-2 text-amber-500 hover:text-amber-700 bg-transparent border-0 cursor-pointer p-0"
                  title="Clear context"
                >
                  <X size={14} />
                </button>
              </div>
            )}
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`max-w-[85%] p-4 rounded-xl text-sm leading-6 shadow-sm animate-fadeIn ${msg.role === 'user'
                  ? 'self-end bg-gradient-to-br from-indigo-500 to-violet-500 text-white rounded-br-sm'
                  : 'self-start bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border-0 rounded-bl-sm'
                  }`}
              >
                {msg.content}
              </div>
            ))}
            {isLoading && (
              <div className="self-start max-w-[85%] p-4 rounded-xl text-sm leading-6 shadow-sm animate-fadeIn bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border-0 rounded-bl-sm flex items-center gap-2">
                <div className="animate-spin w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full"></div>
                <span>Thinking...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="p-5 bg-white dark:bg-slate-800 border-t-0 flex gap-3 items-center">
            <input
              className="flex-1 p-3 rounded-lg border-0 outline-none text-slate-900 dark:text-slate-100 bg-slate-50 dark:bg-slate-700 focus:border-indigo-500 transition-colors"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything..."
              disabled={isLoading}
            />
            {isLoading ? (
              <button
                type="button"
                onClick={handleStop}
                className="bg-red-500 text-white border-0 rounded-lg w-10 h-10 flex items-center justify-center cursor-pointer transition-all hover:scale-105 hover:bg-red-600"
                title="Stop generating"
              >
                <div className="w-3 h-3 bg-white rounded-sm" />
              </button>
            ) : (
              <button
                type="submit"
                className="bg-indigo-500 text-white border-0 rounded-lg w-10 h-10 flex items-center justify-center cursor-pointer transition-all hover:scale-105"
                disabled={!input.trim()}
              >
                <Send size={18} />
              </button>
            )}
          </form>
        </div>
      )}

      <button
        className={`bg-gradient-to-br from-indigo-500 to-purple-500 text-white rounded-full p-4 shadow-lg cursor-pointer flex items-center gap-2 justify-center transition-all duration-300 ${isHovered ? 'transform -translate-y-1 shadow-xl' : ''
          }`}
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isOpen ? <X size={24} /> : <Sparkles size={24} />}
        {!isOpen && <span className="font-bold">AI Tutor</span>}
      </button>
    </div>
  );
};

export default ChatWidget;