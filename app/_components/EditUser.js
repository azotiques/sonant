import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Edit, LogOut, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { signout } from "../_utils/actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function EditUser({ user }) {
  return (
    <div className="w-full">
      <Dialog>
        <DialogTrigger asChild>
          <button
            className="flex w-full items-center justify-between gap-2 rounded-lg px-2 py-1.5 transition-colors hover:bg-zinc-800"
            aria-label="Account settings"
          >
            <span className="flex min-w-0 items-center gap-2">
              <Avatar className="size-9 border border-zinc-700">
                <AvatarImage src={user.avatar} alt={user.global_name} />
                <AvatarFallback className="bg-zinc-800 text-zinc-200">
                  {user.global_name.at(0)}
                </AvatarFallback>
              </Avatar>
              <span className="min-w-0 truncate text-sm font-medium text-zinc-200">
                {user.global_name}
              </span>
            </span>
            <Settings className="size-4 shrink-0 text-zinc-400" />
          </button>
        </DialogTrigger>
        <DialogContent className="flex h-screen border-0 min-w-full bg-zinc-950/90 antialiased">
          <DialogTitle className="w-[40vw]">
            <div className="flex flex-col gap-y-6">
              <button className="text-zinc-400 text-sm flex items-center gap-x-2 hover:bg-zinc-900 rounded-lg px-4 py-3 transition-all">
                Edit Profile
                <Edit className="size-4 text-zinc-400" />
              </button>
              <Separator className="bg-zinc-800" />
              <form action={signout}>
                <button className="text-zinc-400 text-sm flex items-center gap-x-2 hover:bg-zinc-900 rounded-lg px-4 py-3 transition-all">
                  Log Out
                  <LogOut className="size-4 text-zinc-400" />
                </button>
              </form>
            </div>
          </DialogTitle>
          <div className="flex justify-center bg-zinc-950 h-screen w-screen rounded-lg">
            <DialogHeader className="flex justify-center items-center">
              <div className="bg-zinc-950 rounded-xl px-7 py-6">
                <div className="flex px-5 py-4 items-center gap-x-5">
                  <Avatar className="size-24">
                    <AvatarImage src={user.avatar} alt={user.global_name} />
                    <AvatarFallback className="bg-zinc-800 text-4xl text-zinc-200">
                      {user.global_name.at(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <span className="text-white text-2xl font-semibold">
                      {user.global_name}
                    </span>
                  </div>
                </div>
                <div className="bg-zinc-950 border-zinc-900 border shadow-zinc-950/30 shadow-lg rounded-lg">
                  <div className="flex flex-col gap-y-3 w-200 px-5 py-4">
                    <div className="flex justify-between">
                      <div className="flex flex-col items-start">
                        <button className="text-zinc-400 font-semibold">
                          Display Name
                        </button>
                        <button className="text-zinc-400 ">
                          {user.global_name}
                        </button>
                      </div>
                      <Button className="text-white">Edit</Button>
                    </div>
                    <div className="flex justify-between">
                      <div className="flex flex-col items-start">
                        <button className="text-zinc-400 font-semibold">
                          Username
                        </button>
                        <button className="text-zinc-400 ">
                          {user.global_name}
                        </button>
                      </div>
                      <Button className="text-white">Edit</Button>
                    </div>
                    <div className="flex justify-between">
                      <div className="flex flex-col items-start">
                        <button className="text-zinc-400 font-semibold">
                          Email
                        </button>
                        <button className="text-zinc-400 ">
                          {user.email}
                        </button>
                      </div>
                      <Button className="text-white">Edit</Button>
                    </div>
                  </div>
                </div>
              </div>
            </DialogHeader>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default EditUser;
