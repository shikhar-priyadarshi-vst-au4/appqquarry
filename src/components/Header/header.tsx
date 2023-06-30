import Image from "next/image"
import BrandIcon from "@/assets/Football_Icon 1.png";
export default function Header(){
    return <header className="bg-black/[0.8] flex items-center w-full p-2 gap-2">
        <Image 
            src={BrandIcon} 
            width={48} 
            height={41} 
            className="p-2"
            alt="brand"/>
        <div className="font-normal leading-normal text-2xl text-white/[0.9]">Fantasy Football</div>
    </header>
}