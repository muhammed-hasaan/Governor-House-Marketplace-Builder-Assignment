import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("auth-token");

  if (authToken) {
    return new Response(JSON.stringify({ loggedIn: true }), { status: 200 });
  }

  return new Response(JSON.stringify({ loggedIn: false }), { status: 200 });
}
