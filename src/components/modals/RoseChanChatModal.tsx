import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

interface ChatMessage {
  id: string;
  sender: 'rose' | 'user';
  text: string;
  time: string;
  action?: { label: string; actionType: string };
}

export const RoseChanChatModal: React.FC = () => {
  const {
    isRoseChatOpen,
    setIsRoseChatOpen,
    setIsFloorMapModalOpen,
    setIsOmikujiModalOpen,
    setIsVoucherWalletOpen,
    setSelectedFloor,
  } = useApp();

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'rose',
      text: 'Konnichiwa, Olivia-san! 🌸 Welcome to Takashimaya Singapore. I am Rose-chan, your Omotenashi concierge. How may I assist your shopping journey today?',
      time: 'Just now',
    },
  ]);

  if (!isRoseChatOpen) return null;

  const quickPrompts = [
    { label: '🎁 Find a gift', query: 'Can you recommend a luxury Japanese gift?' },
    { label: '✨ What’s trending?', query: 'What are the top spring seasonal highlights?' },
    { label: '🍣 Food Village', query: 'What are the must-try treats in B2 Food Hall?' },
    { label: '✈️ Tax Refund', query: 'How do I claim my tourist GST tax refund?' },
    { label: '🍵 VIP Lounge', query: 'How can I access the Level 4 Prestige Lounge?' },
  ];

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      time: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');

    // Generate responsive concierge reply
    setTimeout(() => {
      let replyText = 'Thank you for asking! Takashimaya Singapore is delighted to assist you with every detail.';
      let action: { label: string; actionType: string } | undefined;

      const lower = query.toLowerCase();
      if (lower.includes('gift') || lower.includes('present')) {
        replyText = 'For luxury gifting, I highly recommend our Level 2 artisanal silk scarves, or traditional Toraya Wagashi in B2 Gourmet Village. All purchases qualify for our signature Takashimaya Japanese rose wrapping & Furoshiki silk packaging!';
        action = { label: 'Explore Level 2 Fashion', actionType: 'floor_l2' };
      } else if (lower.includes('trending') || lower.includes('spring') || lower.includes('sakura')) {
        replyText = 'Our Sakura Spring Discovery Trail is happening right now! Collect stamps across all floors to redeem the exclusive Rose-chan Sakura Acrylic Charm and Chirimen drawstring pouch.';
        action = { label: 'View Rewards Passport', actionType: 'rewards' };
      } else if (lower.includes('food') || lower.includes('b2') || lower.includes('matcha') || lower.includes('eat')) {
        replyText = 'B2 Food Hall features over 80 specialty Japanese counters! Popular favorites include Uji Matcha Roll Cake, freshly baked Hokkaido melon pan, and delicate strawberry daifuku.';
        action = { label: 'Open B2 Directory', actionType: 'floor_b2' };
      } else if (lower.includes('tax') || lower.includes('refund')) {
        replyText = 'Tourist GST tax refunds can be processed electronically at our Customer Service Counter on Level 3 (eTRS self-service kiosks available). Bring your passport and purchase receipts!';
        action = { label: 'Level 3 Customer Desk', actionType: 'floor_l3' };
      } else if (lower.includes('lounge') || lower.includes('vip') || lower.includes('gold')) {
        replyText = 'As a valued Gold VIP member, you and a guest enjoy complimentary access to our Level 4 Prestige VIP Lounge with artisanal matcha, seasonal wagashi, and quiet luxury workstations.';
        action = { label: 'View Level 4 Lounge', actionType: 'floor_l4' };
      } else {
        replyText = `Understood! I'll be happy to guide you through any of our 6 shopping levels, daily Omikuji fortunes, or member petal redemptions.`;
      }

      const roseMsg: ChatMessage = {
        id: `rose-${Date.now()}`,
        sender: 'rose',
        text: replyText,
        time: 'Just now',
        action,
      };

      setMessages((prev) => [...prev, roseMsg]);
    }, 600);
  };

  const handleAction = (actionType: string) => {
    setIsRoseChatOpen(false);
    if (actionType.startsWith('floor_')) {
      const fl = actionType.replace('floor_', '').toUpperCase();
      setSelectedFloor(fl);
      setIsFloorMapModalOpen(true);
    } else if (actionType === 'rewards') {
      setIsFloorMapModalOpen(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#fff8f7] w-full max-w-lg rounded-3xl shadow-2xl border border-[#ffe1e1] flex flex-col h-[600px] max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="p-4 bg-gradient-to-r from-[#b7002d] via-[#df2040] to-[#b7002d] text-white flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-white/20 p-0.5 border border-white/40 flex items-center justify-center overflow-hidden shrink-0">
              <img
                src="/src/assets/images/rose_chan_portrait_1792376401667.jpg"
                alt="Rose-chan"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-serif-luxury font-bold text-base tracking-tight">
                  Rose-chan Concierge
                </h3>
                <span className="px-1.5 py-0.2 rounded-full bg-white/20 text-[10px] font-semibold">
                  Live
                </span>
              </div>
              <p className="text-[11px] text-white/80">Takashimaya Omotenashi Japanese Hospitality</p>
            </div>
          </div>
          <button
            onClick={() => setIsRoseChatOpen(false)}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Messages Container */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3.5 no-scrollbar bg-gradient-to-b from-[#fff8f7] to-[#fff0f0]">
          {messages.map((msg) => {
            const isRose = msg.sender === 'rose';
            return (
              <div
                key={msg.id}
                className={`flex gap-2.5 max-w-[85%] ${
                  isRose ? 'mr-auto items-start' : 'ml-auto flex-row-reverse items-end'
                }`}
              >
                {isRose && (
                  <div className="w-8 h-8 rounded-full bg-[#ffe1e1] text-[#b7002d] flex items-center justify-center shrink-0 border border-[#e5bdbc] overflow-hidden">
                    <img
                      src="/src/assets/images/rose_chan_portrait_1792376401667.jpg"
                      alt="Rose-chan"
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                )}
                <div
                  className={`p-3.5 rounded-2xl text-xs leading-relaxed shadow-2xs ${
                    isRose
                      ? 'bg-white text-[#40000a] rounded-tl-xs border border-[#ffe1e1]'
                      : 'bg-[#b7002d] text-white rounded-br-xs'
                  }`}
                >
                  <p>{msg.text}</p>
                  {msg.action && (
                    <button
                      onClick={() => handleAction(msg.action!.actionType)}
                      className="mt-2.5 inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#b7002d] text-white font-bold text-[11px] hover:bg-[#920022] transition-colors"
                    >
                      <span>{msg.action.label}</span>
                      <span className="material-symbols-outlined text-[13px]">arrow_forward</span>
                    </button>
                  )}
                  <span
                    className={`block text-[9px] mt-1 text-right ${
                      isRose ? 'text-[#906f6f]' : 'text-white/70'
                    }`}
                  >
                    {msg.time}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick prompt recommendations */}
        <div className="px-3 py-2 bg-white/80 border-t border-[#ffe9e8] flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {quickPrompts.map((p, i) => (
            <button
              key={i}
              onClick={() => handleSend(p.query)}
              className="px-2.5 py-1 rounded-full bg-[#ffe9e8] hover:bg-[#ffd9e1] text-[#b7002d] font-semibold text-[11px] whitespace-nowrap transition-colors shrink-0"
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-white border-t border-[#ffe1e1]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Rose-chan about floors, rewards, stores..."
              className="flex-1 bg-[#fff8f7] border border-[#e5bdbc] rounded-full px-4 py-2 text-xs text-[#40000a] placeholder-[#906f6f] focus:outline-none focus:ring-2 focus:ring-[#b7002d]/40"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="w-9 h-9 rounded-full bg-[#b7002d] text-white flex items-center justify-center hover:bg-[#920022] disabled:opacity-40 transition-colors shadow-xs"
            >
              <span className="material-symbols-outlined text-[18px]">send</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
