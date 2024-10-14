import Image from "next/image";
import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-60 shadow-2xl shadow-black bg-[var(--sidebar-background)] rounded-xl">
      {/*  logo  */}
      <Link href="/">
        <h1 className="flex items-center justify-center gap-4 py-2">
          <Image src="/logo.svg" alt="Cloud music" width={50} height={50} className="rounded-full" />
          <span>Cloud music</span>
        </h1>
      </Link>

      <nav></nav>
    </aside>
  );
}
