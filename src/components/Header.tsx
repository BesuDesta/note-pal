import { shadow } from "@/styles/utils";
import Image from "next/image"; // Ensure you have the correct import for Image component from Next.js
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DarkModeToggle } from "@/components/DarkModeToggle";
import LogOutButton from "@/components/LogOutButton";
import { getUser } from "@/auth/server";

async function Header() {
  const user = await getUser();
  return (
    <header 
     className="bg-popover flex items-center justify-between px-4 py-2 shadow-md max-w-full mb-[40px] rounded-sm"
     style={{
      boxShadow: shadow,
     }}
     >
      <Link className="flex items-center text-white no-underline hover:no-underline m-[20px]" href="/">
        <Image 
        src="/pen.jpg" 
        height={60} 
        width={60} 
        alt="Logo" 
        className="rounded-full ml-[10px]"
        priority // This ensures the image is loaded with priority for better performance and SEO
        />

        <h1 className="text-2xl font-semibold leading-6 p-[10px]">
          Note~<span>Pal</span>
        </h1>
      </Link>

      <div className="space-x-4 flex items-center justify-end m-[20px] p-[10px] space-x-[15px]">
        {user ? (
          <LogOutButton />
        ) : (
          <>
          <Button asChild>
            <Link href="/sign-up" className="hidden sm:block no-underline h-[50px] w-[100px] ">Sign Up</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/login" className="rounded-full text-white no-underline h-[50px] w-[100px]">Login</Link>
          </Button>
          </>
        )}
        <DarkModeToggle />

      </div>
    </header>
  )
}

export default Header
