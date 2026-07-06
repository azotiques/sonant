import {
  getFriends,
  getPendingFriendRequests,
  getSentFriendRequests,
  getUser,
} from "../_utils/actions";
import Tabs from "./Tabs";

async function Page() {
  const { userAccount } = await getUser();
  const [{ users }, { userRequests }, { userSent }] = await Promise.all([
    getFriends(userAccount),
    getPendingFriendRequests(userAccount.username, userAccount.id),
    getSentFriendRequests(userAccount.username, userAccount.id),
  ]);

  return <Tabs users={users} userRequests={userRequests} userSent={userSent} />;
}

export default Page;
