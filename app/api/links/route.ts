import { connectToDB } from "@/utils/database";
import Link from "@/model/link";
import { NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {

    const { linkId, userId } = await request.json()
    try {
       await connectToDB()

       const existingLink = await Link.findOne({ linkId })

       if(existingLink){
            if (!existingLink.participants.includes(userId)) {
                existingLink.participants.push(userId);
                await existingLink.save();
                console.log("User added to existing link participants");
            } else {
                console.log("User already in participants");
            }

            return new Response(JSON.stringify(existingLink), { status: 200 });
       }else{
            const newLink = new Link({
                linkId,
                participants: [userId]
            })
            await newLink.save()
            console.log("new link added")

            return new Response(JSON.stringify(newLink), { status: 201 })
       }    
        
    } catch (error) {    
        console.log(error)
        return new Response("Failed to create a new link",{ status: 500 })
    }
}

export const GET = async (request: NextRequest) => {
  const url = new URL(request.url); 
  const linkId = url.searchParams.get("link"); 

  try {
    await connectToDB();

    if (!linkId) {
      return new Response("Link is required", { status: 400 });
    }

    const existingLink = await Link.findOne({ linkId });

    return new Response(JSON.stringify(existingLink), { status: 200 });      
  } catch (error) {
    console.error(error);
    return new Response("Failed to fetch link", { status: 500 });
  }
};
