"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/app/_utils/supabase/server";
import { auth } from "@/auth";
import { Snowflake } from "@theinternetfolks/snowflake";

export async function login(formData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/channels");
}

export async function signout() {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const { error } = await supabase.auth.signOut();

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/channels");
}

export async function signup(formData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const { error: errorSignUp } = await supabase.auth.signUp(data);

  if (errorSignUp) {
    redirect("/error");
  }

  const userData = {
    username: formData.get("username"),
    global_name: formData.get("username"),
    email: formData.get("email"),
  };

  const { error: errorUser } = await supabase
    .from("user")
    .insert(userData)
    .select();

  if (errorUser) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function sendMessage(formData) {
  const id = Snowflake.generate();

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user.id) throw new Error("Unauthorized");

  const { userAccount } = await getUser();

  const { error } = await supabase
    .from("message")
    .insert([
      {
        id: id,
        channel_id: formData.get("channel_id"),
        author: userAccount.at(0),
        content: formData.get("content"),
      },
    ])
    .select();
}

export async function getMessages(channelId) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user.id) throw new Error("Unauthorized");

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

  if (!user.id) throw new Error("Unauthorized");

  const { data: userAccount, error } = await supabase
    .from("user")
    .select("id, username, avatar, email, global_name")
    .eq("email", user.email);

  return { userAccount };
}

export async function getUserById(id) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user.id) throw new Error("Unauthorized");

  const { data: userAccount, error } = await supabase
    .from("user")
    .select("id, username, avatar, email, global_name")
    .eq("id", id);

  return { userAccount };
}

export async function sendFriendRequest(formData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user.id) throw new Error("Unauthorized");

  const { userAccount } = await getUser();

  const [{ userSent }, { userRequests }] = await Promise.all([
    getSentFriendRequests(userAccount.at(0).username),
    getPendingFriendRequests(userAccount.at(0).username),
  ]);

  if (
    userSent.some((user) => user.username === formData.get("username")) ||
    userRequests.some((user) => user.username === formData.get("username")) ||
    getFriends.some((user) => user.username === formData.get("username")) ||
    formData.get("username") == userAccount.at(0).username
  )
    throw new Error("Already sent");

  const { userId } = await getUserIdByUsername(formData.get("username"));

  const { error } = await supabase.from("friend").insert({
    id1: userAccount.at(0).id,
    id2: userId.at(0).id,
    are_friends: false,
  });

  console.log(error);
}

export async function getUserIdByUsername(username) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user.id) throw new Error("Unauthorized");

  const { data: userId, error } = await supabase
    .from("user")
    .select("id")
    .eq("username", username);

  return { userId };
}

export async function getUserIdByEmail(email) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user.id) throw new Error("Unauthorized");

  const { data: userId, error } = await supabase
    .from("user")
    .select("id")
    .eq("email", email);

  return { userId };
}

export async function getPendingFriendRequests(username) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user.id) throw new Error("Unauthorized");

  const { userId } = await getUserIdByUsername(username);

  const { data: friendRequests, error: friendsError } = await supabase
    .from("friend")
    .select("id1")
    .eq("id2", userId.at(0).id)
    .neq("id1", userId.at(0).id)
    .eq("are_friends", false);

  const { data: userRequests, error: userError } = await supabase
    .from("user")
    .select("*")
    .in(
      "id",
      friendRequests.map((friend) => friend.id1)
    );

  return { userRequests };
}

export async function getSentFriendRequests(username) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user.id) throw new Error("Unauthorized");

  const { userId } = await getUserIdByUsername(username);

  const { data: friendSent, error: friendsSentError } = await supabase
    .from("friend")
    .select("id2")
    .eq("id1", userId.at(0).id)
    .neq("id2", userId.at(0).id)
    .eq("are_friends", false);

  const { data: userSent, error: errorSent } = await supabase
    .from("user")
    .select("*")
    .in(
      "id",
      friendSent.map((friend) => friend.id2)
    );

  return { userSent };
}

export async function acceptFriendRequest(formData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user.id) throw new Error("Unauthorized");

  const { data: data1, error: error1 } = await supabase
    .from("friend")
    .update({ are_friends: true })
    .eq("id1", formData.get("id"))
    .select();

  const { data: data2, error: error2 } = await supabase
    .from("friend")
    .update({ are_friends: true })
    .eq("id2", formData.get("id"))
    .select();
}

export async function createChannel(formData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user.id) throw new Error("Unauthorized");

  const { userAccount } = await getUser();

  const { userAccount: friendAccount } = await getUserById(formData.get("id"));

  const id = Snowflake.generate();

  const { error } = await supabase.from("channel").insert({
    id: id,
    recepients: [Number(userAccount.at(0).id), Number(friendAccount.at(0).id)],
  });
}

export async function getChannel(formData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user.id) throw new Error("Unauthorized");

  const { userAccount } = await getUser();

  const { userAccount: friendAccount } = await getUserById(formData.get("id"));

  const { data: channel, error } = await supabase
    .from("channel")
    .select("id::text, created_at, recepients")
    .contains("recepients", [userAccount.at(0).id, friendAccount.at(0).id]);

  if (channel.length === 0) createChannel(formData);

  return { channel };
}

export async function getChannelById(channelId) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user.id) throw new Error("Unauthorized");

  const { data: channel, error } = await supabase
    .from("channel")
    .select("id::text, created_at, recepients")
    .eq("id", channelId);

  return { channel };
}

export async function goToChannel(formData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user.id) throw new Error("Unauthorized");

  const { channel } = await getChannel(formData);

  if (channel.at(0).recepients.includes(Number(formData.get("id"))) === false)
    redirect(`/channels`);

  redirect(`/channels/${channel.at(0).id}`);
}

export async function getFriends() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user.id) throw new Error("Unauthorized");

  const { userAccount } = await getUser();

  const { data: friends, error } = await supabase
    .from("friend")
    .select()
    .or(`id2.eq.${userAccount.at(0).id},or(id1.eq.${userAccount.at(0).id})`)
    .eq("are_friends", true);

  const { data: users } = await supabase
    .from("user")
    .select()
    .in(
      "id",
      friends.map((friend) => friend.id1)
    );

  return { users };
}
