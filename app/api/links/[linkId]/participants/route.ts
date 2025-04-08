import { connectToDB } from "@/utils/database";
import Link from "@/model/link";
import { NextRequest } from "next/server";

export const PATCH = async ( request: NextRequest, { params }: { params: Promise<{ linkId: string }> }) => {
    const { linkId } = await params;
    const { userId } = await request.json()

    try {
        await connectToDB();
        const updatedLinkParticipants = await Link.findOneAndUpdate({ linkId }, { $push: { participants: userId }}, { new: true, runValidators: true } )
        if(!updatedLinkParticipants) throw new Error ('Link Id not found or not updated');

        return new Response(JSON.stringify(updatedLinkParticipants) , { status: 200 })
    } catch (error) {
        console.error('Error updating conversation:', error);
        return new Response("Failed to update a link participants", { status: 500 })   
    }

}