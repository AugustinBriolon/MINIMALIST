import Image from 'next/image';

export default function Footer() {
  return (
    <div className="grid w-full grid-cols-[1fr_auto_1fr] bg-[#1d212d] text-white">
      <div className="col-span-3 p-8">
        <Image
          alt="Minimalist"
          className="h-auto w-full opacity-5"
          height={100}
          src="/icons/Minimalist.svg"
          width={100}
        />
      </div>
      <div className="col-span-3 h-px w-full bg-[#292f3a]"></div>
      <div className="col-span-1 flex w-full items-end justify-start p-8 md:items-center">
        <p className="text-white/40">2024 All rights reserved</p>
      </div>
      <div className="col-span-1 flex w-full items-center justify-center">
        <div className="h-full w-px bg-[#292f3a]"></div>
      </div>
      <div className="col-span-1 flex w-full flex-col items-end justify-end gap-1 p-8">
        <a
          className="group text-sm text-white/40"
          href="https://dribbble.com/Afterglow-studio"
          rel="noopener noreferrer"
          target="_blank"
        >
          Designed by{' '}
          <span className="text-lg transition-colors group-hover:text-white">Afterglow Studio</span>
        </a>
        <a
          className="group text-sm text-white/40"
          href="https://www.paranthese.studio"
          rel="noopener noreferrer"
          target="_blank"
        >
          Code by{' '}
          <span className="text-lg transition-colors group-hover:text-white">
            PARANTHESE STUDIO
          </span>
        </a>
      </div>
    </div>
  );
}
