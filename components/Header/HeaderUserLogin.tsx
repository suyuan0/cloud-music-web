"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown, CircleUser } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogHeader, DialogDescription } from "@/components/ui/dialog";
import React, { useCallback, useEffect, useState } from "react";
import { ApiUrl } from "@/config";
import Image from "next/image";
import dayjs from "dayjs";

interface QrCodeLoginProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

interface QrKeyResult {
  code: number;
  unikey: string;
}

interface CreateQrResult {
  qrimg: string;
  qrurl: string;
}

let timer: NodeJS.Timeout | undefined = undefined;

const QrCodeLogin = (props: QrCodeLoginProps) => {
  const { isOpen, setIsOpen } = props;
  const [qrImage, setQrImage] = useState("");

  const getLoginQrKey = useCallback(async () => {
    const qrKeyResult: CloudMusicResult<QrKeyResult> = await (
      await fetch(`${ApiUrl}/login/qr/key?timestamp=${dayjs().valueOf()}`)
    ).json();
    if (qrKeyResult.code !== 200) throw new Error(qrKeyResult.message);
    const createQrResult: CloudMusicResult<CreateQrResult> = await (
      await fetch(`${ApiUrl}/login/qr/create?key=${qrKeyResult.data.unikey}&qrimg=true&timestamp=${dayjs().valueOf()}`)
    ).json();
    if (createQrResult.code !== 200) throw new Error(qrKeyResult.message);
    setQrImage(createQrResult.data.qrimg);
    timer = setInterval(async () => {
      const qrCheckResult: CloudMusicResult = await (await fetch(`/api/cloudQrCheck?key=${qrKeyResult.data.unikey}`)).json();
      if (qrCheckResult.code === 200) {
        clearInterval(timer);
      }
    }, 1500);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    getLoginQrKey();

    return () => {
      setQrImage("");
      clearInterval(timer);
      timer = undefined;
    };
  }, [getLoginQrKey, isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="bg-[var(--qr-login-background)] py-20 te">
        <DialogHeader>
          <DialogTitle className="text-center tracking-wider">扫码登录</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        {qrImage && <Image className="mx-auto" src={qrImage} alt="" width={300} height={150} />}
      </DialogContent>
    </Dialog>
  );
};

export default function HeaderUserLogin() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* 扫码登录 */}
      <QrCodeLogin isOpen={isOpen} setIsOpen={setIsOpen}></QrCodeLogin>
      <Avatar className="cursor-pointer" onClick={() => setIsOpen(true)}>
        <AvatarImage src="http://p1.music.126.net/kj9Vkdm021KP5KddO1Xg8A==/109951169756241483.jpg"></AvatarImage>
        <AvatarFallback>
          <CircleUser />
        </AvatarFallback>
      </Avatar>
      <span className="cursor-pointer">未登录</span>
      <ChevronDown className="cursor-pointer" />
    </>
  );
}
