import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Cog, Edit, LogOut, Settings, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { signout } from "../_utils/actions";

function EditUser({ user }) {
  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex items-center gap-x-2">
        <div>
          {user.avatar ? (
            <img className="w-12 h-12 rounded-full" src={user.avatar} />
          ) : (
            <span className="w-12 h-12 text-xl font-bold flex items-center justify-center rounded-full bg-rose-600">
              {user.global_name.at(0)}
            </span>
          )}
        </div>
        <div>
          <span className="text-zinc-500">{user.global_name}</span>
        </div>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button>
            <Settings className="text-zinc-500 focus-visible:ring-0 hover:animate-spin" />
          </Button>
        </DialogTrigger>
        <DialogContent className="flex h-screen border-0 min-w-full bg-zinc-950/90 antialiased">
          <DialogTitle className="w-[40vw]">
            <div className="flex flex-col gap-y-6">
              <button className="text-zinc-500 text-sm flex items-center gap-x-2 hover:bg-zinc-900 rounded-lg px-4 py-3 transition-all">
                Edit Profile
                <Edit className="size-4 text-zinc-500" />
              </button>
              <Separator className="bg-zinc-800" />
              <form action={signout}>
                <button className="text-zinc-500 text-sm flex items-center gap-x-2 hover:bg-zinc-900 rounded-lg px-4 py-3 transition-all">
                  Log Out
                  <LogOut className="size-4 text-zinc-500" />
                </button>
              </form>
            </div>
          </DialogTitle>
          <div className="flex justify-center bg-zinc-900 h-screen w-screen rounded-lg">
            <DialogHeader className="flex justify-center items-center">
              <div className="bg-zinc-950 rounded-xl px-7 py-6">
                <div className="flex px-5 py-4 items-center gap-x-5">
                  <div>
                    {user.avatar ? (
                      <img
                        className="w-20 h-20 rounded-full"
                        src={user.avatar}
                      />
                    ) : (
                      <span className="w-20 h-20 text-2xl font-bold flex items-center justify-center rounded-full bg-rose-600">
                        {user.global_name.at(0)}
                      </span>
                    )}
                  </div>
                  <div>
                    <span className="text-white text-2xl font-semibold">
                      {user.global_name}
                    </span>
                  </div>
                </div>
                <div className="bg-zinc-950 border-zinc-900 border-1 shadow-zinc-500/5 shadow-lg rounded-lg">
                  <div className="flex flex-col gap-y-3 w-200 px-5 py-4">
                    <div className="flex justify-between">
                      <div className="flex flex-col items-start">
                        <button className="text-zinc-500 font-semibold">
                          Display Name
                        </button>
                        <button className="text-zinc-500 ">
                          {user.global_name}
                        </button>
                      </div>
                      <Button className="text-white">Edit</Button>
                    </div>
                    <div className="flex justify-between">
                      <div className="flex flex-col items-start">
                        <button className="text-zinc-500 font-semibold">
                          Username
                        </button>
                        <button className="text-zinc-500 ">
                          {user.global_name}
                        </button>
                      </div>
                      <Button className="text-white">Edit</Button>
                    </div>
                    <div className="flex justify-between">
                      <div className="flex flex-col items-start">
                        <button className="text-zinc-500 font-semibold">
                          Email
                        </button>
                        <button className="text-zinc-500 ">{user.email}</button>
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
