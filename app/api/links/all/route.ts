import { connectToDB } from "@/utils/database";
import Link from "@/model/link";
export const GET = async (request:Request) => {
    try {
        connectToDB()
        
        const links = await Link.find()

        if(!links){
            console.log('No Link Found!')
        }
        
        return new Response(JSON.stringify(links), { status: 200 })
    } catch (error) {
        console.log(error)
        return new Response("Failed to fetch all Links", { status: 500 })
    }
}