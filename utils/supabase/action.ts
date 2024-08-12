"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "./server";

export async function login(formData: FormData) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);
  console.log(error);
  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/account");
}

export async function signup(formData: FormData) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signUp(data);
  console.log(error);
  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/account");
}

export async function getAllMessages() {
  const supabase = createClient();

  const messagesUpdated = async (payload: any) => {
    console.log(payload);
    const { data, error } = await supabase.from("messages").select();
    if (error) {
      return error;
    }
    return data;
  };

  supabase
    .channel("messages")
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "messages" },
      messagesUpdated
    )
    .on(
      "postgres_changes",
      { event: "DELETE", schema: "public", table: "messages" },
      messagesUpdated
    )
    .subscribe();

  const { data, error } = await supabase.from("messages").select();
  if (error) {
    return error;
  }

  return data;
}

export async function sendMessage(message: string) {
  const supabase = createClient();
  const _data = {
    content: message,
    ip: "dadsd" as string,
  };

  const { error } = await supabase.from("messages").insert(_data);

  if (error) {
    return error;
  }
  return _data;
}
