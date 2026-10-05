
import { useState } from "react";

function ChatInput({ aiName, onSend, onFileUpload }) {
  const [message, setMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleSend = () => {
    if (!message.trim()) {
      return;
    }

    onSend(message.trim());
    setMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

 
  const handleFileChange = (event) => {
  const file = event.target.files[0];

  if (file && onFileUpload) {
    onFileUpload(file);
  }

  event.target.value = "";
};
  return (
    <div className="border-t border-slate-200 bg-white px-4 py-4">

      <div className="mx-auto max-w-3xl">

        {selectedFile && (
          <div className="mb-2 rounded-lg bg-blue-50 px-3 py-2 text-sm text-blue-700">
            Selected file: {selectedFile.name}
          </div>
        )}

        <div className="flex items-end rounded-2xl border border-slate-200 bg-white p-2 shadow-sm focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100">

          {/* File Upload */}
          <label
            className="mb-1 flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg text-xl text-slate-400 hover:bg-blue-50 hover:text-blue-600"
            title="Attach file"
          >
            +

            <input
              type="file"
              className="hidden"
              accept=".pdf,.png,.jpg,.jpeg,.txt,.doc,.docx"
              onChange={handleFileChange}
            />
          </label>

          {/* Message */}
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`Message ${aiName}...`}
            rows={1}
            className="max-h-32 min-h-10 flex-1 resize-none bg-transparent px-3 py-2 text-sm text-slate-700 outline-none placeholder:text-slate-400"
          />

          {/* Send */}
          <button
            type="button"
            onClick={handleSend}
            disabled={!message.trim()}
            className="mb-1 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-xl font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
            title="Send"
          >
            ↑
          </button>

        </div>

       

      </div>
    </div>
  );
}

export default ChatInput;