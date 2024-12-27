import { Hero } from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Main from "@/components/Main";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Main />
    </div>
  );
}