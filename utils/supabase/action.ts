"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { supabase } from "./server";

export async function login(formData: FormData) {
  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/account");
}

export async function signup(formData: FormData) {
  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/account");
}

export async function getAllMessages() {
  const { data, error } = await supabase.from("messages").select();

  if (error) {
    return error;
  }

  return data;
}

export async function sendMessage(message: string) {
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
