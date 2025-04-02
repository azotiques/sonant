import { getUser } from "../_utils/actions";
import EditUser from "./EditUser";

async function Sidebar() {
  const { userAccount } = await getUser();

  return (
    <div className="bg-zinc-900 rounded-lg px-3 py-2 border-zinc-800 shadow-zinc-600/10 shadow-xl border-1">
      <EditUser user={userAccount} />
    </div>
  );
}

export default Sidebar;
