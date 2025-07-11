"use client"
import React, { useEffect, useRef, useState } from 'react';

export default function AIChatModal({ onClose }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    setMessages(prev => [...prev, { user: input }]);
    const res = await fetch('/api/ai-chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input }),
    });
    const data = await res.json();
    console.log("AI response:", data);
    setMessages(prev => [...prev, { user: input }, { bot: data.response }]);
    setInput('');
  };



  return (
    <div className="fixed inset-0 bg-black/40 flex items-end md:items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full mx-4 md:mx-0 md:max-h-[80vh] flex flex-col overflow-hidden">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="font-bold text-lg">🧠 AI Product Assistant</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-red-500 text-xl">×</button>
        </div>
        <div ref={chatRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
          {messages.map((msg, idx) => (
            <div key={idx} className={`p-2 rounded max-w-[80%] ${msg.user ? 'ml-auto bg-emerald-100 text-right' : 'mr-auto bg-white shadow-sm'}`}>
              {msg.user || msg.bot}
            </div>
          ))}
        </div>
        <div className="p-3 border-t flex items-center gap-2">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            className="border rounded w-full px-3 py-2"
            placeholder="Ask something like: budget headphones for gym..."
          />
          <button
            onClick={handleSend}
            className="bg-emerald-500 text-white px-4 py-2 rounded hover:bg-emerald-600"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
