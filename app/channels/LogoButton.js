import Link from "next/link";

function LogoButton() {
  return (
    <div>
      <button
        className={
          "size-12 text-2xl text-zinc-950 border-white border-t-1 bg-linear-to-r/longer from-teal-100 to-indigo-200 hover:bg-zinc-700 hover:text-zinc-500 px-3 py-2 rounded-lg transition-all"
        }
      >
        <Link href="/channels">S</Link>
      </button>
    </div>
  );
}

export default LogoButton;
