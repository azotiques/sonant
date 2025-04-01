import { login, signup } from "@/app/_utils/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="h-screen flex bg-slate-950 flex-col justify-center items-center">
      <div className="flex flex-col gap-y-4 ">
        <form className="flex flex-col gap-y-4 w-60">
          <label className="text-slate-300" htmlFor="email">
            Email:
          </label>
          <Input id="email" name="email" type="email" required />
          <label className="text-slate-300" htmlFor="password">
            Password:
          </label>
          <Input id="password" name="password" type="password" required />
          <Button className="cursor-pointer" formAction={login}>
            Log in
          </Button>
        </form>
        <Button className="cursor-pointer">
          <Link href="/signup">Sign up</Link>
        </Button>
      </div>
    </div>
  );
}
