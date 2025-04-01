import { login, signup } from "@/app/_utils/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="h-screen flex bg-slate-950 flex-col justify-center items-center">
      <div>
        <form className="flex flex-col gap-y-2 w-60">
          <label className="text-slate-300" htmlFor="email">
            Email:
          </label>
          <Input id="email" name="email" type="email" required />
          <label className="text-slate-300" htmlFor="password">
            Password:
          </label>
          <Input id="password" name="password" type="password" required />
          <label className="text-slate-300">Display name:</label>
          <Input id="username" name="username" type="text" required />
          <Button className="cursor-pointer" formAction={signup}>
            Sign up
          </Button>
        </form>
      </div>
    </div>
  );
}
