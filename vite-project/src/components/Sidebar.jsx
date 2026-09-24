function Sidebar({
  currentPage,
  sidebarOpen,
  setSidebarOpen,
  onNavigate,
}) {
  return (
    <>
      {/* Small button when sidebar is closed */}
      {!sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(true)}
          style={{
            position: "fixed",
            left: "0",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 9999,
            width: "45px",
            height: "60px",
            border: "none",
            borderRadius: "0 10px 10px 0",
            background: "#2563eb",
            color: "white",
            fontSize: "24px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          =
        </button>
      )}

      {/* Full Sidebar */}
      {sidebarOpen && (
        <aside
          style={{
            position: "fixed",
            left: "0",
            top: "72px",
            bottom: "0",
            width: "250px",
            background: "#ffffff",
            borderRight: "1px solid #e2e8f0",
            boxShadow: "4px 0 15px rgba(0,0,0,0.08)",
            zIndex: 9998,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Sidebar Header */}
          <div
            style={{
              padding: "20px",
              borderBottom: "1px solid #e2e8f0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <h2
                style={{
                  margin: 0,
                  fontSize: "18px",
                  fontWeight: "700",
                  color: "#1e293b",
                }}
              >
                Menu
              </h2>

              <p
                style={{
                  margin: "4px 0 0",
                  fontSize: "12px",
                  color: "#64748b",
                }}
              >
                AI Assistant
              </p>
            </div>

            {/* Minimize */}
            <button
              onClick={() => setSidebarOpen(false)}
              style={{
                border: "none",
                background: "#f1f5f9",
                borderRadius: "8px",
                width: "35px",
                height: "35px",
                fontSize: "20px",
                fontWeight: "bold",
                cursor: "pointer",
                color: "#475569",
              }}
            >
              =
            </button>
          </div>

          {/* Menu */}
          <div style={{ padding: "20px", flex: 1 }}>
            <p
              style={{
                fontSize: "11px",
                fontWeight: "700",
                color: "#94a3b8",
                marginBottom: "10px",
              }}
            >
              MENU
            </p>

            {/* Dashboard */}
            <button
              onClick={() => onNavigate("home")}
              style={{
                width: "100%",
                padding: "13px 15px",
                marginBottom: "8px",
                border: "none",
                borderRadius: "10px",
                background:
                  currentPage === "home" ? "#eff6ff" : "transparent",
                color:
                  currentPage === "home" ? "#2563eb" : "#475569",
                textAlign: "left",
                fontSize: "14px",
                fontWeight: "600",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
             
              <span style={{ flex: 1 }}>Dashboard</span>
              <span>→</span>
            </button>

            {/* Chat */}
            <button
              onClick={() => onNavigate("chat")}
              style={{
                width: "100%",
                padding: "13px 15px",
                border: "none",
                borderRadius: "10px",
                background:
                  currentPage === "chat" ? "#eff6ff" : "transparent",
                color:
                  currentPage === "chat" ? "#2563eb" : "#475569",
                textAlign: "left",
                fontSize: "14px",
                fontWeight: "600",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
             
              <span style={{ flex: 1 }}>AI Chat</span>
              <span>→</span>
            </button>
          </div>

       
        </aside>
      )}
    </>
  );
}

export default Sidebar;