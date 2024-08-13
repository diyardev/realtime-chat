import { supabase } from "@/utils/supabase/server";

export async function GET(request) {

  async function getIpNameRequest(ip) {
    const { data, error } = await supabase.from("ip_names").select().eq("ip", ip);
    if (error) {
      return error;
    }
    return data[0];
  }

  function getRandomName() {
    const characters = "abcdefghijklmnopqrstuvwxyz";
    let name = "";
    const length = Math.floor(Math.random() * 6) + 3;
    name += characters
      .charAt(Math.floor(Math.random() * characters.length))
      .toUpperCase();

    for (let i = 1; i < length; i++) {
      name += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return "#" + length + " " + name;
  }

  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded
    ? forwarded.split(/, /)[0]
    : request.ip || request.socket.remoteAddress;

  const name = await getIpNameRequest(ip) || {name  : getRandomName()};
  
  return new Response(JSON.stringify({ ip, name }), {
    headers: { "Content-Type": "application/json" },
  });
}



 
