import { connectToDB } from "@/utils/database"
import User from "@/model/user"

export const POST = async (request: Request) => {
    const { username, avatar } = await request.json()

    try {
        connectToDB()
        const newUser = new User({ username, avatar })
        await newUser.save()
    
        console.log("New User Added")
        return new Response(JSON.stringify(newUser), { status: 201 })
    }

     catch (error) {
        console.log(error)
        return new Response("Failed to create a new user",{ status: 500 })
    }
}