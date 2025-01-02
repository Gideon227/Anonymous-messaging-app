import { Hero } from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Main from "@/components/Main";
import Image from "next/image";
import Body from "@/components/Body";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="bg-[#FAF5EA]">
      <Navbar />
      <Hero />
      <Main />
      <Body />
      <Footer />
    </div>
  );
}