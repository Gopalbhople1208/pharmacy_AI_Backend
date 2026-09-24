function ChatMessages({ messages, aiName }) {
  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 px-6 py-8">

      <div className="mx-auto max-w-3xl">

        {messages.map((message, index) => (

          <div
            key={index}
            className={`mb-8 flex ${
              message.type === "user"
                ? "justify-end"
                : "justify-start"
            }`}
          >

            {message.type === "ai" ? (

              /* AI Message */
              <div className="flex max-w-3xl gap-4">

            
                <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">

               

                  <p className="text-[15px] leading-7 text-slate-700">
                    {message.text}
                  </p>

                </div>

              </div>

            ) : (

              /* User Message */
              <div className="max-w-2xl rounded-2xl bg-blue-600 px-5 py-3 text-[15px] leading-7 text-white shadow-sm">
                {message.text}
              </div>

            )}

          </div>

        ))}

      </div>

    </div>
  );
}

export default ChatMessages;