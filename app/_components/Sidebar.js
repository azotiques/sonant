import { getUser } from "../_utils/actions";
import EditUser from "./EditUser";

async function Sidebar() {
  const { userAccount } = await getUser();

  return (
    <div className="bg-neutral-900 rounded-lg px-3 py-2 border-neutral-800  border-1">
      <EditUser user={userAccount} />
    </div>
  );
}

export default Sidebar;
