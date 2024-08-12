export async function GET(request) {
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(/, /)[0] : request.ip || request.socket.remoteAddress;
  
    return new Response(JSON.stringify({ ip }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }