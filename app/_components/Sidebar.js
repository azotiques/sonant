import { getUser } from "../_utils/actions";
import EditUser from "./EditUser";

async function Sidebar({ user }) {
  const userAccount = user ?? (await getUser()).userAccount;

  return (
    <div className="w-full rounded-md bg-zinc-950 p-1">
      <EditUser user={userAccount} />
    </div>
  );
}

export default Sidebar;
