import Image from "next/image";
import { Work_Sans } from "next/font/google";
import Sec from "@/components/Section";

const sw = Work_Sans({ subsets: ["latin"] })
export default function Home() {
  return (
    <div className={`${sw.className}`}>

    </div>
  );
}
