import { Logo } from '../ui/Icons';

export default function Footer() {
  return (
    <div className="grid w-full grid-cols-[1fr_auto_1fr] bg-[#1d212d] text-white">
      <div className="col-span-3 p-8">
        <Logo className="h-auto w-full opacity-10" />
      </div>
      <div className="col-span-3 h-px w-full bg-white/10"></div>
      <div className="col-span-1 flex w-full flex-col items-start justify-start p-8">
        <p className="text-xs text-pretty text-white/40">
          © Concept project for demonstration purposes only.
        </p>
        <p className="text-xs text-pretty text-white/40">
          Not affiliated with Minimaliste or Afterglow.
        </p>
        <p className="text-xs text-pretty text-white/40">
          All rights to original designs and trademarks belong to their respective owners.
        </p>
      </div>
      <div className="col-span-1 flex w-full items-center justify-center">
        <div className="h-full w-px bg-white/10"></div>
      </div>
      <div className="col-span-1 flex w-full flex-col items-end justify-start gap-1 p-8">
        <a
          className="group text-sx text-white/40 md:text-sm"
          href="https://dribbble.com/Afterglow-studio"
          rel="noopener noreferrer"
          target="_blank"
        >
          Designed by{' '}
          <span className="text-base text-nowrap transition-colors group-hover:text-white sm:text-lg">
            Afterglow Studio
          </span>
        </a>
        <a
          className="group text-sx text-white/40 md:text-sm"
          href="https://www.paranthese.studio"
          rel="noopener noreferrer"
          target="_blank"
        >
          Code by{' '}
          <span className="text-base text-nowrap transition-colors group-hover:text-white sm:text-lg">
            PARANTHESE STUDIO
          </span>
        </a>
      </div>
    </div>
  );
}
