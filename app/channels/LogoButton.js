import Link from "next/link";

function LogoButton() {
  return (
    <div>
      <Link href="/channels">
        <button
          className={
            "size-12 flex flex-col items-center text-2xl text-neutral-950 border-white border-t-1 bg-linear-to-r/longer from-teal-100 to-indigo-200 hover:bg-neutral-700 hover:text-neutral-500 px-3 py-2 rounded-lg transition-all"
          }
        >
          <svg
            id="Layer_1"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 432.39 632.14"
          >
            <path d="M216.24,247.69s-4.05-118.3-96.35-90.02c-38.23,11.71-67.23,43.66-73.04,83.22-6.58,44.81,15.84,103.5,152.65,137.69,0,0-148.3,33.31-193.65-92.56-16.9-46.89,4.26-102.29,45.66-136.22,30.62-25.09,44.67-26.75,59.95-31.76,40.67-13.33,106.52-8.82,104.83-118.04v.02s-6,122.11,122.11,122.11l-.02.04s-122.11-6-122.11,122.11" />
            <path d="M216.16,384.45s4.05,118.3,96.35,90.02c38.23-11.71,67.23-43.66,73.04-83.22,6.58-44.81-15.84-103.5-152.65-137.69,0,0,148.3-33.31,193.65,92.56,16.9,46.89-4.26,102.29-45.66,136.22-30.62,25.09-44.67,26.75-59.95,31.76-40.67,13.33-106.52,8.82-104.83,118.04v-.02s6-122.11-122.11-122.11l.02-.04s122.11,6,122.11-122.11" />
          </svg>
        </button>
      </Link>
    </div>
  );
}

export default LogoButton;
