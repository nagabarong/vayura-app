import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Bodoni_Moda } from "next/font/google";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { ThemeSwitch } from "@/components/custom/ThemeSwitch";

const bodoni = Bodoni_Moda({ subsets: ["latin"], weight: ["900"] });

export default function Home() {
  return (
    <main className="grid min-h-screen w-full grid-cols-4 bg-background">
      <div className="fixed right-6 top-6 z-50 flex items-center gap-2 rounded-full backdrop-blur-sm px-2 py-1">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button aria-label="Open menu" className="h-6 w-6 text-black/80 dark:text-white/80">
              <Menu className="h-6 w-6" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" sideOffset={8} className="mt-2">
            <DropdownMenuItem asChild>
              <Link href="/">Home</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/auth/login">Sign In</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <ThemeSwitch />
      </div>
      <section className="relative h-screen border-r border-black/20">
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
          <span className={`${bodoni.className} text-black/90 leading-none tracking-tight text-[22vw]`}>S</span>
        </div>
        <span className="absolute bottom-4 left-6 text-xs tracking-widest text-black/80">01</span>
      </section>

      <section className="relative h-screen border-r border-black/20 overflow-hidden">
        <Image src="/images/carousel2.jpg" alt="" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-[#d9b1b1]/70 mix-blend-multiply" />
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="z-10 inline-block transform-gpu will-change-transform motion-safe:animate-[soul-ball-bounce_2.8s_cubic-bezier(0.33,0.66,0.66,1)_infinite]">
            <span className={`${bodoni.className} text-white/90 rotate-[130deg] leading-none tracking-tight text-[22vw]`}>O</span>
          </span>
        </div>
        <span className="absolute bottom-4 left-6 text-xs tracking-widest text-white/80">02</span>
      </section>

      <section className="relative h-screen border-r border-black/20">
        <div className="absolute inset-0 flex items-start justify-center pointer-events-none pt-30">
          <span className={`${bodoni.className} text-black/90 leading-none tracking-tight text-[22vw]`}>U</span>
        </div>
        <div className="absolute left-1/2 top-[64%] w-[38%] -translate-x-1/2 text-xs text-black/80">
          <p className="leading-relaxed">Futuristic Flow Shaped By Seamless Systems For Refined Precision</p>
        </div>
        <span className="absolute bottom-4 left-6 text-xs tracking-widest text-black/80">03</span>
      </section>

      <section className="relative h-screen">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className={`${bodoni.className} text-black/90 absolute bottom leading-none tracking-tight text-[22vw]`}>L</span>
        </div>
        <span className="absolute bottom-4 left-6 text-xs tracking-widest text-black/80">04</span>
        <span className="absolute bottom-20 right-2 rotate-90 text-xs text-black/80">COPYRIGHT © 2025</span>
      </section>
    </main>
  );
}
