import clsx from 'clsx';
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
}

export default function Button({ children, className }: ButtonProps) {
  return (
    <button
      className={clsx(
        'rounded-full border border-white/50 px-3 py-1.5 text-center text-sm font-normal text-nowrap text-white',
        className,
      )}
    >
      {children}
    </button>
  );
}
