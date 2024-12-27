import { v4 as uuidv4 } from "uuid";
import Link from "@/model/link";
import { connectToDB } from "@/utils/database"; 

export const createUniqueLinkId = async (): Promise<string> => {
  let linkId = "";
  let isUnique = false;

  try {
    await connectToDB();

    console.log(Link)
    while (!isUnique) {
      linkId = uuidv4();
      
      const existingLink = await Link.findOne({ linkId });

      if (!existingLink) {
        isUnique = true;
      }
    }

    const newLink = new Link({ linkId });
    await newLink.save();

    return linkId;
  } catch (error) {
    console.error("Error creating unique link ID:", error);
    throw new Error("Failed to create a unique link ID");
  }
};

export default createUniqueLinkId;
