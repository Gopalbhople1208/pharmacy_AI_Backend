function ChatSidebar({
  aiName,
  onClose,
  onNewChat,
  recentChats,
  onSelectChat,
}) {
  return (
    <aside className="flex h-full w-64 flex-col border-r border-slate-200 bg-white p-4 text-slate-800">

      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-800">
            {aiName}
          </h2>

          <p className="text-xs text-slate-500">
            AI Assistant
          </p>
        </div>
      </div>

      {/* New Chat */}
      <button
        onClick={onNewChat}
        className="mb-6 flex w-full items-center gap-3 rounded-lg border border-slate-200 px-4 py-3 text-left text-sm font-medium text-slate-700 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600"
      >
        <span className="text-xl text-blue-600">
          +
        </span>

        <span>
          New Chat
        </span>
      </button>

      {/* Recent Chats */}
      <p className="mb-3 px-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
        Recent Chats
      </p>

      <div className="space-y-1 overflow-y-auto">

        {recentChats.length === 0 ? (

          <p className="px-2 py-3 text-sm text-slate-400">
            No recent chats
          </p>

        ) : (

          recentChats.map((chat) => (

            <button
              key={chat.id}
              onClick={() => onSelectChat(chat.id)}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-600"
            >
            

              <span className="truncate ">
                {chat.title}
              </span>
            </button>

          ))

        )}

      </div>

    </aside>
  );
}

export default ChatSidebar;