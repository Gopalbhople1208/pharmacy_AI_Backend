function Header() {
  return (
    <header className="flex h-[72px] items-center justify-between
                       border-b border-slate-200 bg-white px-6">

      {/* Logo / Name */}
      <div className="flex items-center gap-3">

      

        <div>
          <h1 className="text-lg font-bold text-slate-800">
            AI Document Chatbot
          </h1>

          <p className="text-xs text-slate-500">
            AI Assistant
          </p>
        </div>

      </div>

      {/* Right side */}
      <div className="flex items-center gap-5">

       

        <div className="flex items-center gap-3">

          <div className="flex h-9 w-9 items-center justify-center
                          rounded-full bg-blue-600 text-sm font-semibold
                          text-white">
            GL
          </div>

          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-slate-800">
              Gopal, Laukik
            </p>

            <p className="text-xs text-slate-500">
              User
            </p>
          </div>

        </div>

      </div>

    </header>
  );
}

export default Header;