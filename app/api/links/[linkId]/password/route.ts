import { connectToDB } from "@/utils/database";
import Link from "@/model/link";
import { NextRequest } from "next/server";

export const PATCH = async ( request: NextRequest, { params }: { params: Promise<{ linkId: string }> }) => {
    const { linkId } = await params;
    const { password } = await request.json()

    try {
        await connectToDB();
        const updatedLinkPassword = await Link.findOneAndUpdate( { linkId }, { $set: { password: password }}, { new: true, runValidators: true } )
        if(!updatedLinkPassword) throw new Error ('Link Id not found or not updated');

        return new Response(JSON.stringify(updatedLinkPassword) , { status: 200 })
    } catch (error) {
        console.error('Error updating conversation:', error);
        return new Response("Failed to update a link password", { status: 500 })   
    }

}