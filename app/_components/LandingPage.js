import Link from "next/link";
import Button from "./Button";
function LandingPage() {
  return (
    <div className="bg-black">
      <div className="h-screen flex flex-col items-center justify-center">
        <div className="flex flex-col gap-y-2 align-center items-center">
          <div className="text-white text-4xl font-semibold">
            Messaging for musicians, by musicians.
          </div>
          <div className="text-white text-2xl font-extralight">
            The way to collaborate we all needed.
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
