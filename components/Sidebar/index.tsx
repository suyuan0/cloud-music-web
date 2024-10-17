import Image from "next/image";
import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-60 bg-[var(--sidebar-background)]">
      {/*  logo  */}
      <Link href="/">
        <h1 className="flex items-center justify-center gap-4 py-2">
          <Image src="/logo.svg" alt="Cloud music" width={40} height={40} className="rounded-full" />
          <span>Cloud music</span>
        </h1>
      </Link>

      <nav></nav>
    </aside>
  );
}
