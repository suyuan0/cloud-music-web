"use client";

import { Mail, Settings, Shirt } from "lucide-react";
import Link from "next/link";
import HeaderUserLogin from "./HeaderUserLogin";
import ChangeTheme from "@/components/ChangeTheme";

export default function HeaderUser() {
  return (
    <ul className="flex items-center gap-4">
      <li className="flex items-center gap-4">
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
        <ChangeTheme />
      </li>
      <li>
        <Shirt />
      </li>
    </ul>
  );
}
