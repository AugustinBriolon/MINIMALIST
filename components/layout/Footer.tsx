import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function Footer() {
  return (
    <div className="grid w-full grid-cols-[1fr_auto_1fr] bg-[#1c222b] text-white">
      <div className="col-span-3 p-8">
        <Image
          alt="Minimalist"
          className="h-auto w-full"
          height={100}
          src="/icons/Minimalist.svg"
          width={100}
        />
      </div>
      <div className="col-span-3 h-px w-full bg-white"></div>
      <div className="col-span-1 flex w-full items-end justify-start p-8 md:items-center">
        <p>2024 All rights reserved</p>
      </div>
      <div className="col-span-1 flex w-full items-center justify-center">
        <div className="h-full w-px bg-white"></div>
      </div>
      <div className="col-span-1 flex w-full flex-col items-end justify-end gap-4 p-8 md:flex-row md:items-center">
        <p>Privacy Policy</p>
        <p>Terms of Service</p>
        <p>Cookie</p>
      </div>
    </div>
  );
}
