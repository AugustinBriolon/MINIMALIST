import clsx from 'clsx';
import React, { forwardRef } from 'react';

interface BlurCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const BlurCard = forwardRef<HTMLDivElement, BlurCardProps>(
  ({ children, className, style }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx('border border-white/10 bg-white/5 backdrop-blur-md', className)}
        style={style}
      >
        {children}
      </div>
    );
  },
);

BlurCard.displayName = 'BlurCard';

export default BlurCard;
