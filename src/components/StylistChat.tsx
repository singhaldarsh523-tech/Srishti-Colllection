import { FormEvent, useEffect, useRef, useState } from 'react';
import { MessageSquare, Send, Sparkles, X } from 'lucide-react';

interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
}

type ChatModel = 'gemini-4-hydrogen' | 'gemini-3.1-flash-lite';

const STARTER_QUESTIONS = [
  'Suggest a festive salwar suit from Jaipur',
  'What size fits a 38-inch bust?',
  'Tell me about Unstitched Suits fabric lengths',
];

export function StylistChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState<ChatModel>('gemini-4-hydrogen');
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [errorText, setErrorText] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-msg',
      role: 'model',
      text: 'Namaste! Welcome to Srishti Collection. Ask me about our Sarees, Kurtis, Salwar Suits, Unstitched Suits sourced from Kolkata, Jaipur & Surat, or sizing in inches.',
    },
  ]);

  const scrollEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      scrollEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const sendMessage = async (textToSend: string) => {
    const trimmed = textToSend.trim();
    if (!trimmed || isSending) return;

    setErrorText(null);
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: trimmed,
    };

    const historyForServer = messages
      .filter((m) => m.id !== 'welcome-msg')
      .map((m) => ({ role: m.role, text: m.text }));

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsSending(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: historyForServer,
          message: trimmed,
          model: selectedModel,
        }),
      });

      const data = (await response.json()) as { reply?: string; error?: string };

      if (!response.ok || !data.reply) {
        throw new Error(data.error || 'Unable to get a response from Srishti Stylist.');
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `model-${Date.now()}`,
          role: 'model',
          text: data.reply!,
        },
      ]);
    } catch (err) {
      setErrorText(
        err instanceof Error ? err.message : 'Something went wrong while chatting.'
      );
    } finally {
      setIsSending(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>
      {/* Floating Launcher Button */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Open Srishti Stylist Chat"
          className="fixed bottom-5 left-5 z-40 inline-flex items-center gap-2 px-4 py-2.5 bg-[#1C1917] hover:bg-[#332E2A] text-white text-xs font-semibold rounded-full shadow-lg border border-white/15 transition-transform duration-150 hover:-translate-y-0.5 cursor-pointer"
        >
          <MessageSquare className="w-4 h-4 text-[#FAF9F6]" />
          <span>Boutique Stylist</span>
        </button>
      )}

      {/* Multi-turn Chat Drawer */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Srishti Collection Stylist Chat"
          className="fixed bottom-5 left-5 right-5 sm:right-auto sm:w-[390px] h-[520px] max-h-[82vh] z-50 bg-[#FAF9F6] border border-[#E5E0D8] rounded-xl shadow-2xl flex flex-col overflow-hidden animate-chat-in"
        >
          {/* Chat Header */}
          <div className="px-4 py-3 bg-[#1C1917] text-white flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 min-w-0">
              <Sparkles className="w-4 h-4 text-[#E5E0D8] shrink-0" />
              <div className="min-w-0">
                <p className="text-sm font-semibold truncate">Srishti Stylist</p>
                <p className="text-[11px] text-white/70 truncate">
                  Outfit, Sizing & Fabric Concierge
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close stylist chat"
              className="w-8 h-8 rounded-md hover:bg-white/10 flex items-center justify-center text-white cursor-pointer shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Model Role Switcher */}
          <div className="px-3 py-2 bg-[#F3F1EC] border-b border-[#E5E0D8] flex items-center justify-between gap-2 text-[11px]">
            <span className="text-[#57534E] font-medium shrink-0">Mode:</span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setSelectedModel('gemini-4-hydrogen')}
                className={`px-2.5 py-1 rounded text-[11px] font-medium cursor-pointer transition-colors ${
                  selectedModel === 'gemini-4-hydrogen'
                    ? 'bg-white text-[#1C1917] shadow-xs font-semibold'
                    : 'text-[#57534E] hover:text-[#1C1917]'
                }`}
              >
                Stylist Advice
              </button>
              <button
                type="button"
                onClick={() => setSelectedModel('gemini-3.1-flash-lite')}
                className={`px-2.5 py-1 rounded text-[11px] font-medium cursor-pointer transition-colors ${
                  selectedModel === 'gemini-3.1-flash-lite'
                    ? 'bg-white text-[#1C1917] shadow-xs font-semibold'
                    : 'text-[#57534E] hover:text-[#1C1917]'
                }`}
              >
                Quick Sizing
              </button>
            </div>
          </div>

          {/* Scrollable Message Thread */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[85%] px-3.5 py-2.5 rounded-lg text-xs sm:text-[13px] leading-relaxed whitespace-pre-wrap ${
                    msg.role === 'user'
                      ? 'bg-[#8C1D2D] text-white'
                      : 'bg-white border border-[#E5E0D8] text-[#1C1917]'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {isSending && (
              <div className="flex justify-start">
                <div className="px-3.5 py-2.5 rounded-lg bg-white border border-[#E5E0D8] text-xs text-[#57534E]">
                  Checking collection notes...
                </div>
              </div>
            )}

            {errorText && (
              <div
                role="alert"
                className="p-2.5 bg-[#8C1D2D]/10 border border-[#8C1D2D]/30 rounded-md text-xs text-[#8C1D2D]"
              >
                {errorText}
              </div>
            )}

            <div ref={scrollEndRef} />
          </div>

          {/* Starter Chips on Initial Message */}
          {messages.length <= 1 && (
            <div className="px-4 pb-2 flex flex-wrap gap-1.5">
              {STARTER_QUESTIONS.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => sendMessage(q)}
                  className="text-[11px] px-2.5 py-1 bg-white border border-[#E5E0D8] hover:border-[#8C1D2D] text-[#1C1917] rounded-md transition-colors cursor-pointer text-left"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input Bar */}
          <form
            onSubmit={handleSubmit}
            className="p-3 bg-white border-t border-[#E5E0D8] flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about sarees, suits, sizes..."
              aria-label="Ask Srishti Stylist"
              className="flex-1 px-3 py-2 text-xs bg-[#FAF9F6] border border-[#E5E0D8] rounded-md focus:outline-none focus:border-[#8C1D2D]"
            />
            <button
              type="submit"
              disabled={isSending || !input.trim()}
              aria-label="Send message"
              className="w-9 h-9 bg-[#8C1D2D] hover:bg-[#701522] disabled:opacity-50 text-white rounded-md flex items-center justify-center transition-colors cursor-pointer shrink-0"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
