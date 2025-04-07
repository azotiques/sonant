import {
  getFriends,
  getPendingFriendRequests,
  getSentFriendRequests,
  getUser,
} from "../_utils/actions";
import Tabs from "./Tabs";

async function Page() {
  const { userAccount } = await getUser();
  const { users } = await getFriends();
  const { userRequests } = await getPendingFriendRequests(userAccount.username);
  const { userSent } = await getSentFriendRequests(userAccount.username);

  return (
    <Tabs
      userAccount={userAccount}
      users={users}
      userRequests={userRequests}
      userSent={userSent}
    />
  );
}

export default Page;
