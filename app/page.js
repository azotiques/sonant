import { redirect } from "next/navigation";
import LandingPage from "./_components/LandingPage";
import Navigation from "./_components/Navigation";

export default function Home() {
  redirect("/signin");

  return <div>Not yet</div>;
}
