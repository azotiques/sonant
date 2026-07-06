import { getFriends } from "../_utils/actions";
import UserDialog from "./UserDialog";

export default async function AllFriendsSidebar({ user }) {
  const { users } = await getFriends(user);

  return (
    <div className="flex h-full min-w-0 flex-col overflow-hidden">
      <div className="shrink-0 border-b border-zinc-800 px-4 py-3">
        <span className="text-sm font-semibold text-zinc-300">
          Direct Messages
        </span>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-2 pb-24 pt-2">
        {users.length > 0 ? (
          users.map((user) => (
            <div key={user.id} className="w-full">
              <UserDialog user={user} type="friend" />
            </div>
          ))
        ) : (
          <div className="px-3 py-2 text-sm text-zinc-500">
            No direct messages yet
          </div>
        )}
      </div>
    </div>
  );
}
