"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/app/_utils/supabase/server";
import { auth } from "@/auth";
import { Snowflake } from "@theinternetfolks/snowflake";

export async function login(currentState, formData) {
  const supabase = await createClient();

  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    return error.code || error.message;
  }

  revalidatePath("/", "layout");
  redirect("/channels");
}

export async function signout() {
  const supabase = await createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(currentState, formData) {
  const supabase = await createClient();

  const email = formData.get("email");
  const password = formData.get("password");
  const username = formData.get("username");

  const data = {
    email,
    password,
    options: {
      data: {
        username,
        global_name: username,
      },
    },
  };

  const { data: signUpData, error: errorSignUp } = await supabase.auth.signUp(data);

  if (errorSignUp) {
    return `Signup failed: ${errorSignUp.message}`;
  }

  if (signUpData.session) {
    const userData = {
      auth_user_id: signUpData.user.id,
      username,
      global_name: username,
      email,
    };

    const { error: errorUser } = await supabase
      .from("user")
      .upsert(userData, { onConflict: "email", ignoreDuplicates: true });

    if (errorUser) {
      return `Profile failed: ${errorUser.message}`;
    }
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function sendMessage(formData) {
  const id = Snowflake.generate();

  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { userAccount } = await getUser();

  const { channel } = await getChannelById(formData.get("channel_id"));

  if (channel.recepients.includes(userAccount.id) === false)
    throw new Error("Wrong channel");

  if (!(formData.get("content").length > 0)) return;

  const { error } = await supabase
    .from("message")
    .insert([
      {
        id: id,
        channel_id: formData.get("channel_id"),
        author: userAccount,
        content: formData.get("content"),
      },
    ])
    .select();
}

export async function getMessages(channelId) {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session.access_token) throw new Error("Unauthorized");

  const { data: message, error } = await supabase
    .from("message")
    .select("*")
    .eq("channel_id", channelId);

  return { message };
}

export async function getUser() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.id) throw new Error("Unauthorized");

  const { data: userAccount, error } = await supabase
    .from("user")
    .select("id, username, avatar, email, global_name")
    .eq("auth_user_id", user.id)
    .single();

  return { userAccount };
}

export async function getUserById(id) {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data: userAccount, error } = await supabase
    .from("user")
    .select("id, username, avatar, email, global_name")
    .eq("id", id);

  return { userAccount };
}

export async function sendFriendRequest(currentState, formData) {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { userAccount } = await getUser();

  const { users } = await getFriends();

  const [{ userSent }, { userRequests }] = await Promise.all([
    getSentFriendRequests(userAccount.username),
    getPendingFriendRequests(userAccount.username),
  ]);

  if (
    userSent.some((user) => user.username === formData.get("username")) ||
    userRequests.some((user) => user.username === formData.get("username")) ||
    users.some((user) => user.username === formData.get("username")) ||
    formData.get("username") == userAccount.username
  )
    return "You are already friends with that user!";

  const { userId } = await getUserIdByUsername(formData.get("username"));

  if (!userId) return "Invalid username!";

  const { channelId } = await createChannelWithFriends(
    Number(userAccount.id),
    Number(userId.id)
  );

  const { error } = await supabase.from("friend").insert({
    id1: userAccount.id,
    id2: userId.id,
    are_friends: false,
    channelId: channelId,
  });

  if (error) throw new Error(error.message);

  revalidatePath("/channels", "layout");

  return "Friend request sent!";
}

export async function getUserIdByUsername(username) {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data: userId, error } = await supabase
    .from("user")
    .select("id")
    .eq("username", username)
    .single();

  return { userId };
}

export async function getUserIdByEmail(email) {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data: userId, error } = await supabase
    .from("user")
    .select("id")
    .eq("email", email);

  return { userId };
}

export async function getPendingFriendRequests(username, currentUserId) {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const userId = currentUserId
    ? { id: currentUserId }
    : username
    ? (await getUserIdByUsername(username)).userId
    : (await getUser()).userAccount;

  const { data: friendRequests, error: friendsError } = await supabase
    .from("friend")
    .select("id1, channelId::text")
    .eq("id2", userId.id)
    .neq("id1", userId.id)
    .eq("are_friends", false);

  if (friendsError) throw new Error(friendsError.message);
  if (friendRequests.length === 0) return { userRequests: [] };

  const { data: users, error: userError } = await supabase
    .from("user")
    .select("*")
    .in(
      "id",
      friendRequests.map((friend) => friend.id1)
    );

  if (userError) throw new Error(userError.message);

  const usersById = new Map(users.map((user) => [String(user.id), user]));

  const userRequests = friendRequests
    .map((friend) => {
      const user = usersById.get(String(friend.id1));

      if (!user) return null;

      return {
        ...user,
        channelId: friend.channelId,
      };
    })
    .filter(Boolean);

  return { userRequests };
}

export async function getSentFriendRequests(username, currentUserId) {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const userId = currentUserId
    ? { id: currentUserId }
    : username
    ? (await getUserIdByUsername(username)).userId
    : (await getUser()).userAccount;

  const { data: friendSent, error: friendsSentError } = await supabase
    .from("friend")
    .select("id2, channelId::text")
    .eq("id1", userId.id)
    .neq("id2", userId.id)
    .eq("are_friends", false);

  if (friendsSentError) throw new Error(friendsSentError.message);
  if (friendSent.length === 0) return { userSent: [] };

  const { data: users, error: errorSent } = await supabase
    .from("user")
    .select("*")
    .in(
      "id",
      friendSent.map((friend) => friend.id2)
    );

  if (errorSent) throw new Error(errorSent.message);

  const usersById = new Map(users.map((user) => [String(user.id), user]));

  const userSent = friendSent
    .map((friend) => {
      const user = usersById.get(String(friend.id2));

      if (!user) return null;

      return {
        ...user,
        channelId: friend.channelId,
      };
    })
    .filter(Boolean);

  return { userSent };
}

export async function acceptFriendRequest(formData) {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session.access_token) {
    throw new Error("Unauthorized");
  }

  const { userAccount } = await getUser();
  const friendId = formData.get("id");

  const { error } = await supabase
    .from("friend")
    .update({ are_friends: true })
    .eq("id1", friendId)
    .eq("id2", userAccount.id)
    .eq("are_friends", false)
    .select();

  if (error) throw new Error(error.message);

  revalidatePath("/channels", "layout");
}

export async function createChannelWithFriends(id1, id2) {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const id = Snowflake.generate();

  const { data, error } = await supabase
    .from("channel")
    .insert({
      id: id,
      recepients: [id1, id2],
    })
    .select("id::text")
    .single();

  const channelId = data.id;

  return { channelId };
}

export async function createChannel(formData) {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { userAccount } = await getUser();

  const { userAccount: friendAccount } = await getUserById(formData.get("id"));

  const id = Snowflake.generate();

  const { error } = await supabase.from("channel").insert({
    id: id,
    recepients: [Number(userAccount.id), Number(friendAccount.at(0).id)],
  });
}

export async function createChannelByUserId(userId) {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { userAccount } = await getUser();

  const id = Snowflake.generate();

  const { error } = await supabase.from("channel").insert({
    id: id,
    recepients: [Number(userAccount.id), Number(userId)],
  });
}

export async function getChannel(formData) {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { userAccount } = await getUser();

  const { userAccount: friendAccount } = await getUserById(formData.get("id"));

  const { data: channel, error } = await supabase
    .from("channel")
    .select("id::text, created_at, recepients")
    .contains("recepients", [userAccount.id, friendAccount.at(0).id])
    .single();

  if (!channel) createChannel(formData);

  return { channel };
}

export async function getChannelsByUserId() {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { userAccount } = await getUser();

  const { data: channels, error: channelError } = await supabase
    .from("channel")
    .select("id::text")
    .contains("recepients", [userAccount.id]);

  return { channels };
}

export async function getChannelById(channelId) {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data: channel, error } = await supabase
    .from("channel")
    .select("id::text, created_at, recepients")
    .eq("id", channelId)
    .single();

  return { channel };
}

export async function goToChannel(formData) {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { channel } = await getChannel(formData);

  if (channel.recepients.includes(Number(formData.get("id"))) === false)
    redirect(`/channels`);

  redirect(`/channels/${channel.id}`);
}

export async function getFriends(currentUser) {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const userAccount = currentUser ?? (await getUser()).userAccount;

  const { data: friends, error } = await supabase
    .from("friend")
    .select("id, id1, id2, are_friends, channelId::text")
    .or(`id1.eq.${userAccount.id},id2.eq.${userAccount.id}`)
    .eq("are_friends", true);

  if (error) throw new Error(error.message);
  if (friends.length === 0) return { users: [] };

  const friendUserIds = friends.map((friend) =>
    String(friend.id1) === String(userAccount.id) ? friend.id2 : friend.id1
  );
  const channelsByUserId = new Map(
    friends.map((friend) => [
      String(
        String(friend.id1) === String(userAccount.id) ? friend.id2 : friend.id1
      ),
      friend.channelId,
    ])
  );

  const { data: usersData, error: usersError } = await supabase
    .from("user")
    .select()
    .in("id", friendUserIds);

  if (usersError) throw new Error(usersError.message);

  const users = usersData.map((user) => ({
    ...user,
    channelId: channelsByUserId.get(String(user.id)),
  }));

  return { users };
}
