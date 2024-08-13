"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { supabase } from "./server";

export async function login(formData: FormData) {
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
  const { data, error } = await supabase
    .from("messages")
    .select(`
      * ,
      ip_names ( id, name )
    `)
    .order("id", { ascending: true })
    .limit(100);
  if (error) {
    console.log(error)
    return error;
  }

  return data;
}

export async function sendMessage(message: string, ip?: string, name?: string) {
  const _data = {
    content: message,
    ip: ip,
  };

  var { error } = await supabase
    .from("ip_names")
    .insert({ name: name, ip: ip });
  var { error } = await supabase.from("messages").insert(_data);
  if (error) return error;
  return _data;
}

export async function getIpNameRequest(ip: any) {
  const { data, error } = await supabase.from("ip_names").select().eq("ip", ip);
  if (error) {
    return error;
  }
  return data[0];
}

