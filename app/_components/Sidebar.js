import { getUser } from "../_utils/actions";
import EditUser from "./EditUser";

async function Sidebar() {
  const { userAccount } = await getUser();

  return (
    <div className="bg-slate-900 rounded-lg px-3 py-2 border-slate-800 shadow-slate-600/10 shadow-xl border-1">
      <EditUser user={userAccount.at(0)} />
    </div>
  );
}

export default Sidebar;
