import { connectToDB } from "@/utils/database";
import User from "@/model/user";

export const GET = async ( request: Request, { params }: { params: { id: string } } ) => {
    try {
       connectToDB()
       
       const { id } = params
       const user = await User.findById(id)
       return new Response(JSON.stringify(user), {status: 200} )

    } catch (error) {
        return new Response("Failed to fetch a user", { status: 500 })   
    }
}