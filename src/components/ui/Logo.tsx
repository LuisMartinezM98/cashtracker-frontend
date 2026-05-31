import Image from "next/image";



export default function Logo() {
    return (
        <Image 
        src="/logo.svg" 
        alt="Logo CashTrackr" 
        className="w-full" 
        width={0} 
        height={0} 
        priority />
    )
}
