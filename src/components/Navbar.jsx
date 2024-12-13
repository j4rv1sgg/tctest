import React from 'react';
import Image from 'next/image';
import { Button } from "./ui/button";

export default function Navbar() {
  return (
    <div className="flex justify-between h-[96px] px-[64px] py-[24px] bg-white">
        <Image width={191} height={48} src="/TC-logo.png" alt="logo" />
        <div className=' flex gap-[24px]'>
          <Button className="bg-white text-[#FF3414] border border-[#FF3414] hover:bg-[#FF3414] hover:text-white ">Zgłoś problem
          </Button>
          <Button className="bg-[#0068FA] text-white">Umów wizytę</Button>
        </div>
    </div>
  );
}

