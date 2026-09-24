import { useState } from "react";

function ChatInput({ aiName, onSend }) {

  const [message, setMessage] = useState("");

  const handleSend = () => {

    if (!message.trim()) {
      return;
    }

    onSend(message);

    setMessage("");
  };

  const handleKeyDown = (e) => {

    if (e.key === "Enter" && !e.shiftKey) {

      e.preventDefault();

      handleSend();
    }
  };

  return (
    <div className="border-t border-slate-200 bg-white px-4 py-4">

      <div className="mx-auto flex max-w-3xl items-end rounded-2xl border border-slate-200 bg-white p-2 shadow-sm focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100">

        {/* Attach */}
        <button
          className="mb-1 flex h-10 w-10 items-center justify-center rounded-lg text-xl text-slate-400 hover:bg-blue-50 hover:text-blue-600"
          title="Attach file"
        >
          +
        </button>

        {/* Input */}
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={`Message ${aiName}...`}
          rows="1"
          className="max-h-32 min-h-10 flex-1 resize-none bg-transparent px-3 py-2 text-sm text-slate-700 outline-none placeholder:text-slate-400"
        />

        {/* Send */}
        <button
          onClick={handleSend}
          disabled={!message.trim()}
          className="mb-1 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-xl font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
          title="Send"
        >
          ↑
        </button>

      </div>

    

    </div>
  );
}

export default ChatInput;