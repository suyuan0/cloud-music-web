"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown, CircleUser } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogHeader, DialogDescription } from "@/components/ui/dialog";
import React, { useCallback, useEffect, useState } from "react";
import { ApiUrl } from "@/config";
import Image from "next/image";

interface DialogTriggerProps {
  children: React.ReactNode;
}

interface QrKeyResult {
  code: number;
  data: {
    code: number;
    unikey: string;
  };
}

interface QeUrlResult {
  code: number;
  data: {
    qrimg: string;
    qrurl: string;
  };
}

const QrCodeLogin = (props: DialogTriggerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [qrImageUrl, setQrImageUrl] = useState("");
  const [timer, setTimer] = useState<NodeJS.Timeout>();

  const checkQrLoginStatus = useCallback(async (key: string) => {
    const res = await (await fetch(`${ApiUrl}/login/qr/check?key=${key}`)).json();
    console.log(res);
  }, []);

  const getLoginQrKey = useCallback(async () => {
    const qrKeyResult: QrKeyResult = await (await fetch(`${ApiUrl}/login/qr/key`)).json();
    if (qrKeyResult.code !== 200) return;
    const qrUrl: QeUrlResult = await (await fetch(`${ApiUrl}/login/qr/create?key=${qrKeyResult.data.unikey}&qrimg=true`)).json();
    if (qrUrl.code !== 200) return;
    setQrImageUrl(qrUrl.data.qrimg);
    setTimer(setInterval(() => checkQrLoginStatus(qrKeyResult.data.unikey), 3000));
  }, [checkQrLoginStatus]);

  useEffect(() => {
    if (!isOpen) return;
    getLoginQrKey();

    return () => {
      setQrImageUrl("");
      clearInterval(timer);
    };
  }, [getLoginQrKey, isOpen]);

  return (
    <Dialog onOpenChange={setIsOpen}>
      <DialogTrigger className="flex items-center gap-1">{props.children}</DialogTrigger>
      <DialogContent className="bg-[var(--qr-login-background)] py-20 te">
        <DialogHeader>
          <DialogTitle className="text-center tracking-wider">扫码登录</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        {qrImageUrl && <Image src={qrImageUrl} alt="qr url image" width={300} height={100} className="mx-auto" />}
      </DialogContent>
    </Dialog>
  );
};

export default function HeaderUserLogin() {
  return (
    <>
      {/* 扫码登录 */}
      <QrCodeLogin>
        <Avatar className="cursor-pointer">
          <AvatarImage src="http://p1.music.126.net/kj9Vkdm021KP5KddO1Xg8A==/109951169756241483.jpg"></AvatarImage>
          <AvatarFallback>
            <CircleUser />
          </AvatarFallback>
        </Avatar>
        <span className="cursor-pointer">这个昵称我用不了</span>
        <ChevronDown className="cursor-pointer" />
      </QrCodeLogin>
    </>
  );
}
