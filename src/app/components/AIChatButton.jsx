"use client"
import React, { useState } from 'react';
import AIChatModal from './AIChatModal';

export default function AIChatButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 bg-emerald-500 text-white px-5 py-3 rounded-full shadow-lg hover:bg-emerald-600 transition-all z-50"
      >
        🧠 Ask AI
      </button>
      {open && <AIChatModal onClose={() => setOpen(false)} />}
    </>
  );
}
