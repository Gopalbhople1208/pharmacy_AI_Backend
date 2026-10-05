
import { useState } from "react";

import ChatSidebar from "../components/ChatSidebar";
import ChatMessages from "../components/ChatMessages";
import ChatInput from "../components/ChatInput";

import {
  sendMessage,
  uploadDocument,
} from "../services/api";


function AIChatPage({ aiName, onBack }) {

  const [messages, setMessages] = useState([]);

  const [recentChats, setRecentChats] = useState([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");


  // ==========================================
  // Send Message
  // ==========================================

  const handleSend = async (text) => {

    if (!text.trim()) {
      return;
    }

    setError("");

    // Add user message immediately
    const userMessage = {
      type: "user",
      text: text,
    };

    setMessages((previousMessages) => [
      ...previousMessages,
      userMessage,
    ]);

    setLoading(true);

    try {

      // Convert UI AI name to backend provider
      const provider =
        aiName.toLowerCase() === "chatgpt"
          ? "openai"
          : "gemini";


      // Send to FastAPI
      const data = await sendMessage(
        text,
        provider
      );


      // Add AI response
      const aiMessage = {
        type: "ai",
        text:
          data.ai_response ||
          "No response received from AI.",
      };


      setMessages((previousMessages) => [
        ...previousMessages,
        aiMessage,
      ]);


      // Add to recent chats
      setRecentChats((previousChats) => {

        const newChat = {
          id: Date.now(),
          title: text.slice(0, 35),
        };

        return [
          newChat,
          ...previousChats,
        ];
      });


    } catch (error) {

      console.error(
        "Chat error:",
        error
      );

      setError(
        error.message ||
        "Unable to connect to backend."
      );


      setMessages((previousMessages) => [
        ...previousMessages,
        {
          type: "ai",
          text: "Unable to connect to the backend.",
        },
      ]);

    } finally {

      setLoading(false);

    }
  };


  // ==========================================
  // File Upload
  // ==========================================

  const handleFileUpload = async (file) => {

    if (!file) {
      return;
    }

    setError("");

    setLoading(true);


    try {

      const data = await uploadDocument(
        file
      );


      setMessages((previousMessages) => [

        ...previousMessages,

        {
          type: "user",
          text: `Uploaded file: ${file.name}`,
        },

        {
          type: "ai",
          text:
            data.message ||
            "Document uploaded successfully.",
        },

      ]);

    } catch (error) {

      console.error(
        "Upload error:",
        error
      );

      setError(
        error.message ||
        "File upload failed."
      );

    } finally {

      setLoading(false);

    }
  };


  // ==========================================
  // New Chat
  // ==========================================

  const handleNewChat = () => {

    setMessages([]);

    setError("");

  };


  // ==========================================
  // Select Recent Chat
  // ==========================================

  const handleSelectChat = (chatId) => {

    console.log(
      "Selected chat:",
      chatId
    );

  };


  return (

    <div
      className="flex h-[calc(100vh-72px)]"
    >

      {/* ==================================
          Chat Sidebar
      ================================== */}

      <ChatSidebar

        aiName={aiName}

        onClose={onBack}

        onNewChat={handleNewChat}

        recentChats={recentChats}

        onSelectChat={handleSelectChat}

      />


      {/* ==================================
          Main Chat Area
      ================================== */}

      <div className="flex min-w-0 flex-1 flex-col">


        {/* Chat Header */}

        <div className="flex items-center border-b border-slate-200 bg-white px-6 py-4">

          <div>

            <h2 className="font-semibold text-slate-800">
              {aiName}
            </h2>

            <p className="text-xs text-slate-500">
              AI Document & Pharmacy Assistant
            </p>

          </div>

        </div>


        {/* Error */}

        {error && (

          <div className="border-b border-red-200 bg-red-50 px-6 py-3 text-sm text-red-600">

            {error}

          </div>

        )}


        {/* Messages */}

        <ChatMessages

          messages={messages}

          aiName={aiName}

        />


        {/* Loading */}

        {loading && (

          <div className="px-6 pb-2 text-sm text-slate-400">

            AI is processing your request...

          </div>

        )}


        {/* Input */}

        <ChatInput

          aiName={aiName}

          onSend={handleSend}

          onFileUpload={handleFileUpload}

        />

      </div>

    </div>

  );
}


export default AIChatPage;