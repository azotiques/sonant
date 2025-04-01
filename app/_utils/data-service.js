import { createClient } from "./supabase/server";

export async function getUser() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("user")
    .select("global_name, avatar");

  return data;
}
