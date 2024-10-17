"use client";

import Image from "next/image";
import gsap from "gsap";
import { useEffect, useRef } from "react";

export default function Footer() {
  const musicCoverRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    gsap.to(musicCoverRef.current, {
      rotate: 360,
      duration: 20,
      animationIterationCount: "infinite"
    });
  }, []);

  return (
    <footer className="h-16 rounded-bl-xl rounded-br-xl overflow-hidden bg-[var(--footer-background)] border-t-2 border-[var(--footer-background-color)] flex items-center px-10">
      <div className="bg-[#070707] rounded-full w-10 h-10 flex items-center justify-center">
        <Image
          src="http://p1.music.126.net/kj9Vkdm021KP5KddO1Xg8A==/109951169756241483.jpg"
          alt=""
          ref={musicCoverRef}
          className="rounded-full"
          width={25}
          height={25}
        />
      </div>
    </footer>
  );
}
