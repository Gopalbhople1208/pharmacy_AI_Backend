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

import { useState } from "react";

import ChatSidebar from "../components/ChatSidebar";
import ChatMessages from "../components/ChatMessages";
import ChatInput from "../components/ChatInput";

function AIChatPage({ aiName, onBack }) {

  // Sidebar
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Recent chats
  const [recentChats, setRecentChats] = useState([]);

  // Current chat
  const [currentChatId, setCurrentChatId] = useState(null);

  // Messages of current chat
  const [messages, setMessages] = useState([
    {
      type: "ai",
      text: `Hello! I am ${aiName}. How can I help you today?`,
    },
  ]);


  // --------------------------------
  // CREATE NEW CHAT
  // --------------------------------
  const handleNewChat = () => {

    const newChat = {
      id: Date.now(),
      title: "New Chat",
      messages: [
        {
          type: "ai",
          text: `Hello! I am ${aiName}. How can I help you today?`,
        },
      ],
    };

    // Store chat in Recent Chats
    setRecentChats((previousChats) => [
      newChat,
      ...previousChats,
    ]);

    // Select new chat
    setCurrentChatId(newChat.id);

    // Show its messages
    setMessages(newChat.messages);
  };


  // --------------------------------
  // SEND MESSAGE
  // --------------------------------
  const handleSend = (text) => {

    const userMessage = {
      type: "user",
      text: text,
    };

    const aiMessage = {
      type: "ai",
      text: `This is a sample response from ${aiName}. Your backend and AI API will provide the real answer here.`,
    };

    const updatedMessages = [
      ...messages,
      userMessage,
      aiMessage,
    ];

    setMessages(updatedMessages);


    // Update current chat
    if (currentChatId) {

      setRecentChats((previousChats) =>
        previousChats.map((chat) => {

          if (chat.id === currentChatId) {

            return {
              ...chat,

              // Use first user question as title
              title:
                chat.title === "New Chat"
                  ? text.substring(0, 25)
                  : chat.title,

              messages: updatedMessages,
            };
          }

          return chat;
        })
      );
    }
  };


  // --------------------------------
  // OPEN RECENT CHAT
  // --------------------------------
  const handleSelectChat = (chatId) => {

    const selectedChat = recentChats.find(
      (chat) => chat.id === chatId
    );

    if (!selectedChat) {
      return;
    }

    setCurrentChatId(selectedChat.id);

    setMessages(selectedChat.messages);
  };


  return (
    <div className="flex h-[calc(100vh-72px)] bg-slate-50 text-slate-800">

      {/* Sidebar */}
      {sidebarOpen && (
        <ChatSidebar
          aiName={aiName}
          onClose={() => setSidebarOpen(false)}
          onNewChat={handleNewChat}
          recentChats={recentChats}
          onSelectChat={handleSelectChat}
        />
      )}


      {/* Main Area */}
      <div className="flex min-w-0 flex-1 flex-col">


        {/* Header */}
        <header className="flex h-16 items-center border-b border-slate-200 bg-mauve-300 px-5">

          {/* Open Sidebar */}
          {!sidebarOpen && (
            <button
              onClick={() => setSidebarOpen(true)}
              className="mr-4 rounded-lg border border-slate-200 px-3 py-2 text-lg font-bold text-slate-500 hover:bg-blue-50 hover:text-blue-600"
            >
              =
            </button>
          )}


          {/* AI Information */}
          <div className="flex items-center gap-3">

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
              AI
            </div>

            <div>
              <h1 className="text-sm font-semibold text-slate-800">
                {aiName}
              </h1>

              <p className="text-xs text-slate-500">
                AI Assistant
              </p>
            </div>

          </div>


          {/* Back */}
          <button
            onClick={onBack}
            className="ml-auto rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600"
          >
            ← Back
          </button>

        </header>


        {/* Messages */}
        <ChatMessages
          messages={messages}
          aiName={aiName}
        />


        {/* Input */}
        <ChatInput
          aiName={aiName}
          onSend={handleSend}
        />

      </div>

    </div>
  );
}

export default AIChatPage;