import { connectToDB } from "@/utils/database";
import User from "@/model/user";

export const GET = async ( request: Request, { params }: { params: Promise<{ id: string }> } ) => {
    try {
       connectToDB()
       
       const { id } = await params
       const userId = id.toString();
       
       if (!userId) {
          return new Response("Invalid ID", { status: 400 });
       }

       const user = await User.findById(userId);

       if (!user) {
          return new Response("User not found", { status: 404 });
       }
       return new Response(JSON.stringify(user), {status: 200} )

    } catch (error) {
        return new Response("Failed to fetch a user", { status: 500 })   
    }
}