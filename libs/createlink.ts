import { v4 as uuidv4 } from "uuid";
import Link from "@/model/link";
import { connectToDB } from "@/utils/database"; 
import getSingleLink from "./getSingleLink";

export const createUniqueLinkId = async (): Promise<string> => {
  let linkId = "";
  let isUnique = false;

  try {
    await connectToDB();

    console.log(Link)
    while (!isUnique) {
      linkId = uuidv4();
      
      const existingLink = await getSingleLink(linkId)

      if (!existingLink) {
        isUnique = true;
      }
    }

    return linkId;
  } catch (error) {
    console.error("Error creating unique link ID:", error);
    throw new Error("Failed to create a unique link ID");
  }
};

export default createUniqueLinkId;
