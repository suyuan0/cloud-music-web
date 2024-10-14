"use client";

import { Mail, Settings, Shirt } from "lucide-react";
import Link from "next/link";
import HeaderUserLogin from "./HeaderUserLogin";

export default function HeaderUser() {
  return (
    <ul className="flex items-center gap-4">
      <li>
        <HeaderUserLogin />
      </li>
      <li>
        <Mail />
      </li>
      <li>
        <Link href="/setting">
          <Settings />
        </Link>
      </li>
      <li>
        <Shirt />
      </li>
    </ul>
  );
}
