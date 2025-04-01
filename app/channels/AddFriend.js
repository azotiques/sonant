import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { sendFriendRequest } from "../_utils/actions";

function AddFriend() {
  return (
    <div className="flex flex-col gap-y-3">
      <h1 className="text-white text-2xl font-semibold">Add Friend</h1>
      <span className="text-white">
        Add your friends with their Sonant usernames.
      </span>
      <div className="flex flex-col">
        <form action={sendFriendRequest}>
          <div className="flex flex-row items-center justify-between gap-x-2 px-4 py-3 w-[40vw] border-slate-800 shadow-slate-950/40 shadow-xl border-1 rounded-4xl text-white break-normal">
            <input
              placeholder="Enter your friend's Sonant username."
              className="px-4 py-3 w-[30vw] bg-slate-950 rounded-3xl text-white break-normal"
              name="username"
              type="text"
            />
            <Button size="lg">Send friend request</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddFriend;
