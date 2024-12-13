import React from 'react';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import {
  Home,
  BriefcaseMedical,
  Calendar,
  Settings,
  HelpCircle,
  ArrowRight,
  Layers2,
  Notebook,
  Hospital,
  Headset,
  ChartNoAxesCombined,
  LogOut 
} from 'lucide-react';
export default function SideBar() {
  return (
    <div className="flex flex-col p-[24px] w-[295px] bg-white">
      <Image
        width={80}
        height={80}
        className="mb-[8px]"
        src="/avatar.png"
        alt="avatar"
      />
      <p className="font-bold text-[#1A3F7A]">Imię Nazwisko</p>
      <div className="font-normal text-[#6D7178]">
        <p>Operator</p>
        <p>name@gmail.com</p>
      </div>
      <Separator className="mt-[24px] mb-[16px]" />
      <div className="space-y-[16px] text-[#242628] font-medium">
        <div className="flex items-center space-x-3">
          <Home className="h-5 w-5" />
          <span>Strona główna</span>
        </div>
        <div className="flex items-center space-x-3">
          <Headset className="h-5 w-5" />
          <span>Wizyty online</span>
        </div>
        <div className="flex items-center space-x-3 font-bold text-[#0068FA]">
          <BriefcaseMedical className="h-5 w-5" />
          <span>Wizyty domowe</span>
        </div>
        <div className="flex items-center space-x-3">
          <Hospital  className="h-5 w-5" />
          <span>Wizyty stacjonarne</span>
        </div>
        <div className="flex items-center space-x-3">
          <Layers2 className="h-5 w-5" />
          <span>Druga opinia</span>
        </div>
        <div className="flex items-center space-x-3">
          <Notebook className="h-5 w-5" />
          <span>Dziennik aktywności</span>
        </div>
        <div className="flex items-center space-x-3">
          <Calendar className="h-5 w-5" />
          <span>Kalendarz specjalistów</span>
        </div>
        <div className="flex items-center space-x-3">
          <ChartNoAxesCombined className="h-5 w-5" />
          <span>Raporty</span>
        </div>
        <Separator className="my-[16px]" />
        <div className="flex items-center space-x-3">
          <Settings className="h-5 w-5" />
          <span>Ustawienia</span>
        </div>
        <div className="flex items-center space-x-3">
          <HelpCircle className="h-5 w-5" />
          <span>FAQ</span>
        </div>
        <Separator className="my-[16px]" />

        <div className="flex items-center space-x-3">
          <LogOut  className="h-5 w-5" />
          <span>Wyloguj się</span>
        </div>
      </div>
    </div>
  );
}
