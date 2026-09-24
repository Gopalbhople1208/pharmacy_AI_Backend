function ChatPage({ onSelectAI }) {

  const aiOptions = [
    {
      name: "Cloud",
      description: "Connect cloud AI",
      color: "hover:border-blue-400 hover:bg-blue-50",
      textColor: "text-blue-600",
    },

    {
      name: "ChatGPT",
      description: "Connect ChatGPT",
      color: "hover:border-green-400 hover:bg-green-50",
      textColor: "text-green-600",
    },

    {
      name: "Gemini",
      description: "Connect Google Gemini",
      color: "hover:border-purple-400 hover:bg-purple-50",
      textColor: "text-purple-600",
    },
  ];

  return (
    <div className="mx-auto max-w-6xl px-6 py-8">

      <h2 className="text-2xl font-bold text-slate-800">
        Open Chat
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        Select an AI service to start chatting.
      </p>

      <div className="mt-6 grid gap-5 md:grid-cols-2">

        {aiOptions.map((ai) => (

          <button
            key={ai.name}
            onClick={() => onSelectAI(ai.name)}
            className={`flex w-full items-center
                       rounded-xl border
                       border-slate-200 bg-white
                       p-6 text-left shadow-sm
                       transition
                       ${ai.color}`}
          >

            <div className="flex-1">

              <h3 className="font-semibold text-slate-800">
                {ai.name}
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                {ai.description}
              </p>

            </div>

            <span
              className={`ml-4 text-xl font-bold
                          ${ai.textColor}`}
            >
              →
            </span>

          </button>

        ))}

      </div>

    </div>
  );
}

export default ChatPage;