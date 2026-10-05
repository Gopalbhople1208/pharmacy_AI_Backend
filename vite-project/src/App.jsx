
import { useEffect, useState } from "react";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";

import Home from "./pages/Home";
import ChatPage from "./pages/ChatPage";
import AIChatPage from "./pages/AIChatPage";

import { getInventory } from "./services/api";

function App() {
  const [page, setPage] = useState("home");
  const [selectedAI, setSelectedAI] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  // ==========================================
  // Load Inventory From FastAPI
  // ==========================================
  useEffect(() => {
    getInventory()
      .then((data) => {
        console.log("Inventory data:", data);

        setInventory(data.inventory || []);
      })
      .catch((err) => {
        console.error("Backend connection error:", err);

        setError("Unable to connect to backend");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);


  // ==========================================
  // Open Chat
  // ==========================================
  const openChat = () => {
    setPage("chat");
    setSidebarOpen(false);
  };


  // ==========================================
  // Select AI
  // ==========================================
  const openAIChat = (aiName) => {
    setSelectedAI(aiName);
    setPage("ai-chat");
    setSidebarOpen(false);
  };


  // ==========================================
  // Back To Chat Options
  // ==========================================
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

        {/* =========================
            Existing Pages
        ========================= */}

        {page === "home" && <Home />}

        {page === "chat" && (
          <ChatPage
            onSelectAI={openAIChat}
          />
        )}

        {page === "ai-chat" && (
          <AIChatPage
            aiName={selectedAI}
            onBack={backToChatOptions}
          />
        )}


        {/* =========================
            Temporary Backend Test
        ========================= */}

        {page === "home" && (
          <div
            style={{
              marginTop: "30px",
              padding: "20px",
              background: "white",
              borderRadius: "12px",
              border: "1px solid #e2e8f0",
            }}
          >

            <h2
              style={{
                fontSize: "22px",
                fontWeight: "600",
                marginBottom: "15px",
              }}
            >
              Pharmacy Database Connection
            </h2>


            {loading && (
              <p>
                Loading medicines from PostgreSQL...
              </p>
            )}


            {error && (
              <p
                style={{
                  color: "red",
                }}
              >
                {error}
              </p>
            )}


            {!loading && !error && (
              <>
                <p
                  style={{
                    marginBottom: "15px",
                  }}
                >
                  Total Medicines:{" "}
                  <strong>{inventory.length}</strong>
                </p>


                {inventory.slice(0, 10).map((item) => (
                  <div
                    key={item.medicine_id}
                    style={{
                      border: "1px solid #e2e8f0",
                      padding: "12px",
                      marginBottom: "10px",
                      borderRadius: "8px",
                    }}
                  >

                    <strong>
                      {item.medicine_name}
                    </strong>

                    <p>
                      Stock: {item.current_stock}
                    </p>

                    <p>
                      Status: {item.status}
                    </p>

                    <p>
                      Expiry: {item.expiry_date}
                    </p>

                  </div>
                ))}

              </>
            )}

          </div>
        )}

      </main>


      {/* =========================
          Sidebar
      ========================= */}

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