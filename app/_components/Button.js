function Button({ type, children, className }) {
  return (
    <div className={className}>
      {type === "medium" && (
        <button className=" border-white hover:bg-white hover:text-black transition-all cursor-pointer border px-3 py-2 rounded-[8px]">
          {children}
        </button>
      )}
      {type === "large" && (
        <button className="text-xl border-white hover:bg-white hover:text-black transition-all cursor-pointer border px-4 py-3 rounded-[8px]">
          {children}
        </button>
      )}
      {type === "large-solid" && (
        <button className="text-xl hover:bg-transparent hover:text-white border-white bg-white text-black transition-all cursor-pointer border px-5 py-4 rounded-[8px]">
          {children}
        </button>
      )}
    </div>
  );
}

export default Button;
