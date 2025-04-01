import Link from "next/link";
import Button from "./Button";
function LandingPage() {
  return (
    <section>
      <div className="h-screen flex flex-col items-center justify-center gap-18">
        <h1 className="md:text-9xl font-semibold">{"SONANT"}</h1>
        <p className="md:text-2xl font-mono">
          {"The communication app for music producers, by producers."}
        </p>
        <Link href="/channels/friends/all">
          {" "}
          <Button className="font-mono" type="large-solid">
            {"Open Sonant in your browser"}
          </Button>
        </Link>
      </div>
    </section>
  );
}

export default LandingPage;
