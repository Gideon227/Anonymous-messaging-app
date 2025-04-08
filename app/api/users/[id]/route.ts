import { connectToDB } from "@/utils/database";
import User from "@/model/user";
import { NextRequest } from "next/server";

export const GET = async ( request: NextRequest, { params }: { params: Promise<{ id: string }> } ) => {
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

export const PATCH = async ( request: NextRequest, { params }: { params: Promise<{ id: string }> } ) => {
   const { id } = await params

   const { username, avatar } = await request.json()
   try {
      connectToDB()

      const updatedUser = await User.findByIdAndUpdate( 
         id, 
         { $set: { username, avatar } }, 
         { new: true, runValidators: true }
      )

      if (!updatedUser) throw new Error('Product not found or not updated');

      return new Response(JSON.stringify(updatedUser), {status: 200} )
   } catch (error) {
      console.error('Error updating product:', error);
      return new Response("Failed to update a single product", { status: 500 })
   }  
}