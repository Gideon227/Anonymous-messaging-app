"use client";
import Loading from "../loading";
import Setup from "@/components/Setup";
import { useRouter } from "next/navigation";
import { useLayoutEffect, useEffect, useState, Suspense } from "react";
import createUniqueLinkId from "@/libs/createlink";
import createNewLink from "@/libs/createNewLink";
import getSingleUser from "@/libs/getSingleUser";
import { useSearchParams } from "next/navigation";

interface Profile {
  username: string;
  avatar: number;
}

const CreateProfilePage = () => {
  const router = useRouter();
  const [linkId, setLinkId] = useState<any>(null)
  const [shouldRender, setShouldRender] = useState(false);

  const searchParams = useSearchParams(); // Get query parameters
  const redirectFromLink = searchParams?.get("redirect") || null;

  useEffect(() => {
    const initialize = async () => {
      const profileFromLocalStorage = localStorage.getItem("profile");
      const profile: Profile | null = profileFromLocalStorage
        ? JSON.parse(profileFromLocalStorage)
        : null;
  
      try {
        const chatRoomLink = await createUniqueLinkId();
        setLinkId(chatRoomLink);
  
        if (profile) {
          if (redirectFromLink) {
            router.push(redirectFromLink);
          } else {
            router.push(`/chatroom/${chatRoomLink}`);
          }
        } else {
          setShouldRender(true);
        }
      } catch (error) {
        console.error("Failed to create chat room link", error);
        setShouldRender(true);
      } finally{
        
      }
    };
  
    initialize();
  }, [router]);
  

  if (!shouldRender) return null;

  return (
    <Suspense fallback={<Loading />}>
      <div className="lg:mt-32 mt-8">
        <Setup linkId={linkId}/>
      </div>
    </Suspense>
  );
};

export default CreateProfilePage;
