// function ChatMessages({ messages, aiName }) {
//   return (
//     <div className="flex-1 overflow-y-auto bg-slate-50 px-6 py-8">

//       <div className="mx-auto max-w-3xl">

//         {messages.map((message, index) => (

//           <div
//             key={index}
//             className={`mb-8 flex ${
//               message.type === "user"
//                 ? "justify-end"
//                 : "justify-start"
//             }`}
//           >

//             {message.type === "ai" ? (

//               /* AI Message */
//               <div className="flex max-w-3xl gap-4">

            
//                 <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">

               

//                   <p className="text-[15px] leading-7 text-slate-700">
//                     {message.text}
//                   </p>

//                 </div>

//               </div>

//             ) : (

//               /* User Message */
//               <div className="max-w-2xl rounded-2xl bg-blue-600 px-5 py-3 text-[15px] leading-7 text-white shadow-sm">
//                 {message.text}
//               </div>

//             )}

//           </div>

//         ))}

//       </div>

//     </div>
//   );
// }

// export default ChatMessages;

  // function ChatMessages({ messages, aiName }) {
  //   return (
  //     <div className="flex-1 overflow-y-auto bg-slate-50 px-6 py-8">

  //       <div className="mx-auto max-w-3xl">

  //         {messages.map((message, index) => (

  //           <div
  //             key={index}
  //             className={`mb-8 flex ${
  //               message.type === "user"
  //                 ? "justify-end"
  //                 : "justify-start"
  //             }`}
  //           >

  //             {message.type === "ai" ? (

  //               <div className="flex max-w-3xl gap-4">

  //                 <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white shadow-sm">
  //                   AI
  //                 </div>

  //                 <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">

  //                   <p className="mb-2 text-sm font-semibold text-blue-600">
  //                     {aiName}
  //                   </p>

  //                   <p className="text-[15px] leading-7 text-slate-700">
  //                     {message.text}
  //                   </p>

  //                 </div>

  //               </div>

  //             ) : (

  //               <div className="max-w-2xl rounded-2xl bg-blue-600 px-5 py-3 text-[15px] leading-7 text-white shadow-sm">
  //                 {message.text}
  //               </div>

  //             )}

  //           </div>

  //         ))}

  //       </div>

  //     </div>
  //   );
  // }

  // export default ChatMessages;

  function ChatMessages({ messages, aiName }) {
  return (
    <div className="flex-1 overflow-y-auto bg-slate-50 px-6 py-8">

      <div className="mx-auto max-w-4xl">

        {messages.map((message, index) => {

          // Support different message formats
          const isAI =
            message.type === "ai" ||
            message.sender === "ai" ||
            message.role === "assistant";

          const isUser =
            message.type === "user" ||
            message.sender === "user" ||
            message.role === "user";


          return (
            <div
              key={index}
              className={`mb-7 flex ${
                isUser ? "justify-end" : "justify-start"
              }`}
            >

              {/* =========================
                  AI MESSAGE
              ========================= */}

              {isAI && (

                <div className="flex max-w-3xl items-start gap-3">

                  {/* AI Icon */}

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white shadow-sm">
                    AI
                  </div>


                  {/* AI Response Card */}

                  <div className="min-w-0 rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-sm">

                    {/* AI Name */}



                    {/* AI Answer */}

                    <div className="whitespace-pre-wrap text-[15px] leading-7 text-slate-700">
                      {message.text}
                    </div>

                  </div>

                </div>

              )}


              {/* =========================
                  USER MESSAGE
              ========================= */}

              {isUser && (

                <div className="max-w-2xl">

                  <div className="rounded-2xl rounded-br-md bg-blue-600 px-5 py-3 text-[15px] leading-7 text-white shadow-sm">

                    <div className="whitespace-pre-wrap">
                      {message.text}
                    </div>

                  </div>

                </div>

              )}

            </div>
          );
        })}

      </div>

    </div>
  );
}

export default ChatMessages;