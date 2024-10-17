import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import dayjs from "dayjs";
import { ApiUrl } from "@/config";

interface QrCheckResult {
  code: number;
  message: string;
  cookie: string;
}

export async function GET(request: NextRequest) {
  const key = request.nextUrl.searchParams.get("key");
  const qrCheckResult: QrCheckResult = await (
    await fetch(`${ApiUrl}/login/qr/check?key=${key}&timestamp=${dayjs().valueOf()}`)
  ).json();

  if (qrCheckResult.code !== 803) return NextResponse.json(qrCheckResult, { status: 200 });

  const loginStatus = await (
    await fetch(`${ApiUrl}/login/status?timestamp=${dayjs().valueOf()}`, {
      method: "POST",
      body: JSON.stringify({
        "cookie": qrCheckResult.cookie
      })
    })
  ).json();

  console.log(loginStatus);

  return NextResponse.json({ code: 200, message: qrCheckResult.message }, { status: 200 });
}
