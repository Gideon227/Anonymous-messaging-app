import { connectToDB } from "@/utils/database";
import User from "@/model/user";

export const GET = async (request: Request) => {
  const url = new URL(request.url); // Parse the request URL
  const username = url.searchParams.get("username"); // Get the `username` query parameter

  try {
    await connectToDB();

    if (!username) {
      return new Response("Username is required", { status: 400 });
    }

    const user = await User.findOne({ username });

    if (!user || user.length === 0) {
      return new Response(JSON.stringify({ message: 'No user found' }), { status: 404 });
    }

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Failed to fetch user", { status: 500 });
  }
};
