const Logo: React.FC = () => {
  return (
    <div className="group relative inline-flex items-center cursor-pointer transition-transform duration-300 hover:scale-[1.03]">
      {/* background accent */}
      <span
        className="absolute inset-0 -z-10 rounded-lg 
                     bg-indigo-100/70 blur-[6px]
                     transition-all duration-300
                     group-hover:bg-indigo-200/80
                     group-hover:blur-[10px]"
      />

      <div className="flex items-center space-x-2 px-3 py-1.5">
        <svg
          viewBox="0 0 24 24"
          className="h-7 w-7 stroke-indigo-600 transition-transform duration-300 group-hover:rotate-3"
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <path d="M14 2v6h6" />
        </svg>

        <span className="text-xl tracking-tight">
          <span className="relative font-medium text-gray-600">
            Re
            <span className="absolute left-0 -bottom-0.5 h-[1px] w-full bg-gray-400" />
          </span>

          <span className="font-extrabold text-indigo-600 transition-colors duration-300">
            PDF
          </span>
        </span>
      </div>
    </div>
  );
};

export default Logo;
