import { supabase } from "@/utils/supabase/server";

export async function GET(request) {

  async function getIpNameRequest(ip) {
    const { data, error } = await supabase.from("ip_names").select().eq("ip", ip);
    if (error) {
      return error;
    }
  
    return data[0];
  }
  
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded
    ? forwarded.split(/, /)[0]
    : request.ip || request.socket.remoteAddress;

  const name = await getIpNameRequest(ip);
  
  return new Response(JSON.stringify({ ip, name }), {
    headers: { "Content-Type": "application/json" },
  });
}

 
