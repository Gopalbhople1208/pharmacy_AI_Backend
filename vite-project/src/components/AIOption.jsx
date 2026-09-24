function AIOption({
  name,
  description,
  icon,
  onClick
}) {
  return (
    <button
      onClick={onClick}
      className="group w-full rounded-2xl border bg-white p-5
                 text-left shadow-sm transition
                 hover:-translate-y-1 hover:border-blue-400
                 hover:shadow-lg"
    >

      <div className="mb-4 flex items-center gap-4">

        <div className="flex h-12 w-12 items-center justify-center
                        rounded-xl bg-slate-100 text-2xl
                        group-hover:bg-blue-50">
          {icon}
        </div>

        <div>
          <h3 className="font-semibold text-slate-800">
            {name}
          </h3>

          <p className="text-sm text-slate-500">
            {description}
          </p>
        </div>

      </div>

      <div className="text-sm font-medium text-blue-600">
        Connect →
      </div>

    </button>
  );
}

export default AIOption;