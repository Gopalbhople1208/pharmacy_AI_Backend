// import { useState } from "react";

// import ChatSidebar from "../components/ChatSidebar";
// import ChatMessages from "../components/ChatMessages";
// import ChatInput from "../components/ChatInput";

// function AIChatPage({ aiName }) {

//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   const [messages, setMessages] = useState([
//     {
//       type: "ai",
//       text: `Hello! I am ${aiName}. How can I help you today?`,
//     },
//   ]);

//   /* Send message */
//   const handleSend = (text) => {

//     const userMessage = {
//       type: "user",
//       text: text,
//     };

//     const aiMessage = {
//       type: "ai",
//       text: `This is a sample response from ${aiName}. Your backend and AI API will provide the real answer here.`,
//     };

//     setMessages((previousMessages) => [
//       ...previousMessages,
//       userMessage,
//       aiMessage,
//     ]);
//   };

//   /* New chat */
//   const handleNewChat = () => {

//     setMessages([
//       {
//         type: "ai",
//         text: `Hello! I am ${aiName}. How can I help you today?`,
//       },
//     ]);
//   };

//   return (
//     <div className="flex h-[calc(100vh-72px)] bg-[#212121] text-white">

//       {/* Sidebar */}
//       {sidebarOpen && (
//         <ChatSidebar
//           aiName={aiName}
//           onClose={() => setSidebarOpen(false)}
//           onNewChat={handleNewChat}
//         />
//       )}

//       {/* Main Area */}
//       <div className="flex min-w-0 flex-1 flex-col">

//         {/* Top Header */}
//         <header className="flex h-16 items-center border-b border-gray-700 px-5">

//           {!sidebarOpen && (
//             <button
//               onClick={() => setSidebarOpen(true)}
//               className="mr-4 rounded-lg px-3 py-2 text-xl text-gray-400 hover:bg-gray-800 hover:text-white"
//               title="Open Sidebar"
//             >
//               =
//             </button>
//           )}

//           <div className="flex items-center gap-3">

//             <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-bold">
//               AI
//             </div>

//             <div>
//               <h1 className="text-sm font-semibold">
//                 {aiName}
//               </h1>

//               <p className="text-xs text-gray-500">
//                 AI Assistant
//               </p>
//             </div>

//           </div>
//             {/* Back */}
//           <button
//             onClick={onBack}
//             className="ml-auto rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600"
//           >
//             ← Back
//           </button>

//         </header>

//         {/* Messages */}
//         <ChatMessages
//           messages={messages}
//           aiName={aiName}
//         />

//         {/* Input */}
//         <ChatInput
//           aiName={aiName}
//           onSend={handleSend}
//         />

//       </div>

//     </div>
//   );
// }

// // export default AIChatPage;
// import { useState } from "react";

// import ChatSidebar from "../components/ChatSidebar";
// import ChatMessages from "../components/ChatMessages";
// import ChatInput from "../components/ChatInput";

// function AIChatPage({ aiName, onBack }) {

//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   const [messages, setMessages] = useState([
//     {
//       type: "ai",
//       text: `Hello! I am ${aiName}. How can I help you today?`,
//     },
//   ]);

//   // Send message
//   const handleSend = (text) => {

//     const userMessage = {
//       type: "user",
//       text: text,
//     };

//     const aiMessage = {
//       type: "ai",
//       text: `This is a sample response from ${aiName}. Your backend and AI API will provide the real answer here.`,
//     };

//     setMessages((previousMessages) => [
//       ...previousMessages,
//       userMessage,
//       aiMessage,
//     ]);
//   };

//   // New chat
//   const handleNewChat = () => {

//     setMessages([
//       {
//         type: "ai",
//         text: `Hello! I am ${aiName}. How can I help you today?`,
//       },
//     ]);
//   };

//   return (
//     <div className="flex h-[calc(100vh-72px)] bg-slate-50 text-slate-800">

//       {/* Sidebar */}
//       {sidebarOpen && (
//         <ChatSidebar
//           aiName={aiName}
//           onClose={() => setSidebarOpen(false)}
//           onNewChat={handleNewChat}
//         />
//       )}

//       {/* Main Area */}
//       <div className="flex min-w-0 flex-1 flex-col">

//         {/* Top Header */}
//         <header className="flex h-16 items-center border-b border-slate-200 bg-mauve-300 px-5">

//           {/* Open Sidebar Button */}
//           {!sidebarOpen && (
//             <button
//               onClick={() => setSidebarOpen(true)}
//               className="mr-4 rounded-lg border border-slate-200 px-3 py-2 text-lg font-bold text-slate-500 hover:bg-blue-50 hover:text-blue-600"
//               title="Open Sidebar"
//             >
//               =
//             </button>
//           )}

//           {/* AI Information */}
//           <div className="flex items-center gap-3">

//             <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
//               AI
//             </div>

//             <div>
//               <h1 className="text-sm font-semibold text-slate-800">
//                 {aiName}
//               </h1>

//               <p className="text-xs text-slate-500">
//                 AI Assistant
//               </p>
//             </div>

//           </div>

//           {/* Back Button */}
//           <button
//             onClick={onBack}
//             className="ml-auto rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600"
//           >
//             ← Back
//           </button>

//         </header>

//         {/* Messages */}
//         <ChatMessages
//           messages={messages}
//           aiName={aiName}
//         />

//         {/* Input */}
//         <ChatInput
//           aiName={aiName}
//           onSend={handleSend}
//         />

//       </div>

//     </div>
//   );
// }

// export default AIChatPage;

// import { useState } from "react";

// import ChatSidebar from "../components/ChatSidebar";
// import ChatMessages from "../components/ChatMessages";
// import ChatInput from "../components/ChatInput";

// function AIChatPage({ aiName, onBack }) {

//   // Sidebar
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   // Recent chats
//   const [recentChats, setRecentChats] = useState([]);

//   // Current chat
//   const [currentChatId, setCurrentChatId] = useState(null);

//   // Messages of current chat
//   const [messages, setMessages] = useState([
//     {
//       type: "ai",
//       text: `Hello! I am ${aiName}. How can I help you today?`,
//     },
//   ]);


//   // --------------------------------
//   // CREATE NEW CHAT
//   // --------------------------------
//   const handleNewChat = () => {

//     const newChat = {
//       id: Date.now(),
//       title: "New Chat",
//       messages: [
//         {
//           type: "ai",
//           text: `Hello! I am ${aiName}. How can I help you today?`,
//         },
//       ],
//     };

//     // Store chat in Recent Chats
//     setRecentChats((previousChats) => [
//       newChat,
//       ...previousChats,
//     ]);

//     // Select new chat
//     setCurrentChatId(newChat.id);

//     // Show its messages
//     setMessages(newChat.messages);
//   };


//   // --------------------------------
//   // SEND MESSAGE
//   // --------------------------------
//   const handleSend = (text) => {

//     const userMessage = {
//       type: "user",
//       text: text,
//     };

//     const aiMessage = {
//       type: "ai",
//       text: `This is a sample response from ${aiName}. Your backend and AI API will provide the real answer here.`,
//     };

//     const updatedMessages = [
//       ...messages,
//       userMessage,
//       aiMessage,
//     ];

//     setMessages(updatedMessages);


//     // Update current chat
//     if (currentChatId) {

//       setRecentChats((previousChats) =>
//         previousChats.map((chat) => {

//           if (chat.id === currentChatId) {

//             return {
//               ...chat,

//               // Use first user question as title
//               title:
//                 chat.title === "New Chat"
//                   ? text.substring(0, 25)
//                   : chat.title,

//               messages: updatedMessages,
//             };
//           }

//           return chat;
//         })
//       );
//     }
//   };


//   // --------------------------------
//   // OPEN RECENT CHAT
//   // --------------------------------
//   const handleSelectChat = (chatId) => {

//     const selectedChat = recentChats.find(
//       (chat) => chat.id === chatId
//     );

//     if (!selectedChat) {
//       return;
//     }

//     setCurrentChatId(selectedChat.id);

//     setMessages(selectedChat.messages);
//   };


//   return (
//     <div className="flex h-[calc(100vh-72px)] bg-slate-50 text-slate-800">

//       {/* Sidebar */}
//       {sidebarOpen && (
//         <ChatSidebar
//           aiName={aiName}
//           onClose={() => setSidebarOpen(false)}
//           onNewChat={handleNewChat}
//           recentChats={recentChats}
//           onSelectChat={handleSelectChat}
//         />
//       )}


//       {/* Main Area */}
//       <div className="flex min-w-0 flex-1 flex-col">


//         {/* Header */}
//         <header className="flex h-16 items-center border-b border-slate-200 bg-mauve-300 px-5">

//           {/* Open Sidebar */}
//           {!sidebarOpen && (
//             <button
//               onClick={() => setSidebarOpen(true)}
//               className="mr-4 rounded-lg border border-slate-200 px-3 py-2 text-lg font-bold text-slate-500 hover:bg-blue-50 hover:text-blue-600"
//             >
//               =
//             </button>
//           )}


//           {/* AI Information */}
//           <div className="flex items-center gap-3">

//             <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
//               AI
//             </div>

//             <div>
//               <h1 className="text-sm font-semibold text-slate-800">
//                 {aiName}
//               </h1>

//               <p className="text-xs text-slate-500">
//                 AI Assistant
//               </p>
//             </div>

//           </div>


//           {/* Back */}
//           <button
//             onClick={onBack}
//             className="ml-auto rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600"
//           >
//             ← Back
//           </button>

//         </header>


//         {/* Messages */}
//         <ChatMessages
//           messages={messages}
//           aiName={aiName}
//         />


//         {/* Input */}
//         <ChatInput
//           aiName={aiName}
//           onSend={handleSend}
//         />

//       </div>

//     </div>
//   );
// }

// export default AIChatPage;

// import { useState } from "react";
// import ChatSidebar from "../components/ChatSidebar";
// import ChatMessages from "../components/ChatMessages";
// import ChatInput from "../components/ChatInput";
// import { sendMessage, uploadDocument } from "../services/api";

// function AIChatPage({ aiName, onBack }) {
//   const [sidebarOpen, setSidebarOpen] = useState(true);

//   const [recentChats, setRecentChats] = useState([]);

//   const [currentChatId, setCurrentChatId] = useState(null);

//   const [messages, setMessages] = useState([
//     {
//       type: "ai",
//       text: `Hello! I am ${aiName}. How can I help you today?`,
//     },
//   ]);

//   // -----------------------------
//   // NEW CHAT
//   // -----------------------------
//   const handleNewChat = () => {
//     const newChat = {
//       id: Date.now(),
//       title: "New Chat",
//       messages: [
//         {
//           type: "ai",
//           text: `Hello! I am ${aiName}. How can I help you today?`,
//         },
//       ],
//     };

//     setRecentChats((prev) => [newChat, ...prev]);

//     setCurrentChatId(newChat.id);

//     setMessages(newChat.messages);
//   };

//   // -----------------------------
//   // SEND MESSAGE TO BACKEND
//   // -----------------------------
//   const handleSend = async (text) => {
//     if (!text.trim()) return;

//     const userMessage = {
//       type: "user",
//       text: text,
//     };

//     const updatedUserMessages = [...messages, userMessage];

//     setMessages(updatedUserMessages);

//     try {
//       // Send message to FastAPI backend
//       const data = await sendMessage(text);

//       const aiMessage = {
//         type: "ai",
//         text:
//           data.ai_response ||
//           "No response received from the backend.",
//       };

//       const updatedMessages = [
//         ...updatedUserMessages,
//         aiMessage,
//       ];

//       setMessages(updatedMessages);

//       // Save message in recent chat
//       if (currentChatId) {
//         setRecentChats((prev) =>
//           prev.map((chat) =>
//             chat.id === currentChatId
//               ? {
//                   ...chat,
//                   title:
//                     chat.title === "New Chat"
//                       ? text.substring(0, 30)
//                       : chat.title,
//                   messages: updatedMessages,
//                 }
//               : chat
//           )
//         );
//       }
//     } catch (error) {
//       console.error("Backend connection error:", error);

//       const errorMessage = {
//         type: "ai",
//         text:
//           "Unable to connect to the backend. Please make sure the FastAPI server is running.",
//       };

//       setMessages((prev) => [
//         ...prev,
//         errorMessage,
//       ]);
//     }
//   };

//   // -----------------------------
//   // UPLOAD DOCUMENT TO BACKEND
//   // -----------------------------
//   const handleFileUpload = async (file) => {
//     if (!file) return;

//     try {
//       const data = await uploadDocument(file);

//       const uploadMessage = {
//         type: "ai",
//         text:
//           data.message ||
//           "Document uploaded successfully.",
//       };

//       setMessages((prev) => [
//         ...prev,
//         uploadMessage,
//       ]);
//     } catch (error) {
//       console.error("Upload error:", error);

//       setMessages((prev) => [
//         ...prev,
//         {
//           type: "ai",
//           text:
//             "Unable to upload the document. Please check the backend.",
//         },
//       ]);
//     }
//   };

//   // -----------------------------
//   // SELECT RECENT CHAT
//   // -----------------------------
//   const handleSelectChat = (chat) => {
//     setCurrentChatId(chat.id);

//     setMessages(chat.messages);
//   };

//   return (
//     <div className="flex h-[calc(100vh-72px)] bg-slate-50">

//       {/* Chat Sidebar */}
//       {sidebarOpen && (
//         <ChatSidebar
//           aiName={aiName}
//           onClose={() => setSidebarOpen(false)}
//           onNewChat={handleNewChat}
//           recentChats={recentChats}
//           onSelectChat={handleSelectChat}
//         />
//       )}

//       {/* Main Chat Area */}
//       <div className="flex flex-1 flex-col">

//         {/* Chat Header */}
//         <header className="flex items-center justify-between border-b bg-white px-6 py-4">

//           <div className="flex items-center gap-3">

//             {!sidebarOpen && (
//               <button
//                 onClick={() => setSidebarOpen(true)}
//                 className="rounded-lg border px-3 py-2 text-gray-700 hover:bg-gray-100"
//               >
//                 =
//               </button>
//             )}

//             <div>
//               <h2 className="text-lg font-semibold text-gray-800">
//                 {aiName}
//               </h2>

//               <p className="text-sm text-gray-500">
//                 AI Document Assistant
//               </p>
//             </div>
//           </div>

//           <button
//             onClick={onBack}
//             className="rounded-lg border px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//           >
//             Back
//           </button>
//         </header>

//         {/* Messages */}
//         <div className="flex-1 overflow-y-auto">
//           <ChatMessages messages={messages} />
//         </div>

//         {/* Input */}
//         <ChatInput
//           aiName={aiName}
//           onSend={handleSend}
//           onFileUpload={handleFileUpload}
//         />

//       </div>
//     </div>
//   );
// }

// export default AIChatPage;


// import { useState } from "react";
// import ChatSidebar from "../components/ChatSidebar";
// import ChatMessages from "../components/ChatMessages";
// import ChatInput from "../components/ChatInput";

// import {
//   sendMessage,
//   uploadDocument
// } from "../services/api";


// function AIChatPage({ aiName, onBack }) {

//   const [messages, setMessages] = useState([]);

//   const [recentChats, setRecentChats] = useState([]);

//   const [activeChatId, setActiveChatId] = useState(null);



// const handleSend = async (text) => {
//   if (!text.trim()) {
//     return;
//   }

//   const userMessage = {
//     id: Date.now(),
//     sender: "user",
//     text: text,
//   };

//   setMessages((prev) => [
//     ...prev,
//     userMessage,
//   ]);

//   try {
//     const provider = aiName.toLowerCase();

//     console.log("Selected AI:", provider);

//     const data = await sendMessage(text, provider);

//     const aiMessage = {
//       id: Date.now() + 1,
//       sender: "ai",
//       text:
//         data.ai_response ||
//         "No response received from the backend.",
//     };

//     setMessages((prev) => [
//       ...prev,
//       aiMessage,
//     ]);

//   } catch (error) {
//     console.error("Backend connection error:", error);

//     const errorMessage = {
//       id: Date.now() + 2,
//       sender: "ai",
//       text: `Error: ${error.message}`,
//     };

//     setMessages((prev) => [
//       ...prev,
//       errorMessage,
//     ]);
//   }
// };

//   const handleFileUpload = async (file) => {

//     if (!file) {
//       return;
//     }


//     try {

//       const data = await uploadDocument(file);


//       const uploadMessage = {
//         id: Date.now(),
//         sender: "ai",
//         text:
//           data.message ||
//           `Document "${file.name}" uploaded successfully.`
//       };


//       setMessages((prev) => [
//         ...prev,
//         uploadMessage
//       ]);

//     } catch (error) {

//       const errorMessage = {
//         id: Date.now(),
//         sender: "ai",
//         text: `File upload error: ${error.message}`
//       };


//       setMessages((prev) => [
//         ...prev,
//         errorMessage
//       ]);
//     }
//   };


//   const handleNewChat = () => {

//     setMessages([]);

//     setActiveChatId(null);
//   };


//   const handleSelectChat = (chat) => {

//     setActiveChatId(chat.id);

//     // For now, start with empty messages.
//     // Chat history storage can be added later.
//     setMessages([]);
//   };


//   return (

//     <div className="flex h-[calc(100vh-130px)] bg-white rounded-xl shadow-sm overflow-hidden">

//       <ChatSidebar
//         aiName={aiName}
//         onClose={onBack}
//         onNewChat={handleNewChat}
//         recentChats={recentChats}
//         onSelectChat={handleSelectChat}
//       />


//       <div className="flex flex-col flex-1">

//         {/* AI Header */}

//         <div className="border-b px-6 py-4 flex items-center justify-between">

//           <div>

//             <h2 className="text-xl font-semibold text-slate-800">
//               {aiName}
//             </h2>

//             <p className="text-sm text-slate-500">
//               AI Document Assistant
//             </p>

//           </div>


//           <button
//             onClick={onBack}
//             className="px-4 py-2 rounded-lg border border-slate-300 hover:bg-slate-50"
//           >
//             Back
//           </button>

//         </div>


//         {/* Messages */}

//         <div className="flex-1 overflow-y-auto">

//           <ChatMessages
//             messages={messages}
//           />

//         </div>


//         {/* Input */}

//         <div className="border-t p-4">

//           <ChatInput
//           aiName={aiName}
//             onSend={handleSend}
//             onFileUpload={handleFileUpload}
//           />

//         </div>

//       </div>

//     </div>
//   );
// }


// export default AIChatPage;
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