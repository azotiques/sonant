import { useQuery } from "@tanstack/react-query";
import { getFriends } from "../_utils/actions";
import { LoaderCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import UserDialog from "../_components/UserDialog";

function AllFriends() {
  const {
    data: friends,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["friends"],
    queryFn: async () => {
      const { users } = await getFriends();
      return users;
    },
  });

  if (isLoading)
    return (
      <p>
        <LoaderCircle className="size-8 text-zinc-700 animate-spin" />
      </p>
    );

  return (
    <div>
      {friends.length > 0 && (
        <div className="flex flex-col gap-y-2">
          <span className="text-white font-semibold">{`All friends - ${friends.length}`}</span>
          <Separator className="bg-zinc-800" />
          {friends.map((user) => (
            <div key={user.id} className="flex flex-col gap-y-2">
              <UserDialog user={user} type="friend" />
              <Separator className="bg-zinc-800" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AllFriends;
