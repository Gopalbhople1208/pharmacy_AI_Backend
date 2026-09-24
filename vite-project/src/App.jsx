import { useState } from "react";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

import Home from "./pages/Home";
import ChatPage from "./pages/ChatPage";
import AIChatPage from "./pages/AIChatPage";

function App() {
  const [page, setPage] = useState("home");
  const [selectedAI, setSelectedAI] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Click Chat from sidebar
  const openChat = () => {
    setPage("chat");
    setSidebarOpen(false);
  };

  // Select Cloud / ChatGPT / Gemini
  const openAIChat = (aiName) => {
    setSelectedAI(aiName);
    setPage("ai-chat");
    setSidebarOpen(false);
  };

  // Back from AI chat
  const backToChatOptions = () => {
    setPage("chat");
    setSidebarOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      
      <Header />

      <main
        style={{
          minHeight: "calc(100vh - 72px)",
          marginLeft: sidebarOpen ? "250px" : "0",
          transition: "margin-left 0.2s ease",
          padding: "30px",
        }}
      >
        {page === "home" && <Home />}

        {page === "chat" && (
          <ChatPage onSelectAI={openAIChat} />
        )}

        {page === "ai-chat" && (
          <AIChatPage
            aiName={selectedAI}
            onBack={backToChatOptions}
          />
        )}
      </main>

      <Sidebar
        currentPage={page}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        onNavigate={(newPage) => {
          if (newPage === "home") {
            setPage("home");
            setSidebarOpen(true);
          }

          if (newPage === "chat") {
            openChat();
          }
        }}
      />
    </div>
  );
}

export default App;