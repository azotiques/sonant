"use client";

import { signup } from "@/app/_utils/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useActionState, useState } from "react";
import { TriangleAlert } from "lucide-react";

export default function SignupPage() {
  const [message, formAction, isPending] = useActionState(signup, null);

  return (
    <div className="h-screen flex bg-zinc-950 flex-col justify-center items-center">
      <div>
        <Card className="bg-zinc-900 border-0 text-white">
          <CardHeader>
            <CardTitle className="text-2xl">Create an account</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="flex flex-col gap-y-6 size-120">
              <div className="flex flex-col gap-y-3">
                <label
                  className="text-zinc-300 font-bold text-sm"
                  htmlFor="email"
                >
                  EMAIL
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoFocus
                />
                <label className="text-zinc-300 font-bold text-sm">
                  DISPLAY NAME
                </label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  required
                  autoFocus
                />
                <label
                  className="text-zinc-300 font-bold text-sm"
                  htmlFor="password"
                >
                  {message === "weak_password" ? (
                    <div className="flex items-center gap-x-2 text-rose-500 text-[13px]">
                      <TriangleAlert className="size-4" />
                      YOUR PASSWORD MUST HAVE ATLEAST 6 CHARACTERS
                    </div>
                  ) : (
                    "PASSWORD"
                  )}
                </label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoFocus
                />
              </div>

              <Button formAction={formAction} className="cursor-pointer h-16">
                Sign up
              </Button>
            </form>
          </CardContent>
          <CardFooter>
            <p className="bg-linear-to-r/longer from-teal-50 to-indigo-300 bg-clip-text text-transparent">
              <Link href="/signin">Already have an account?</Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
