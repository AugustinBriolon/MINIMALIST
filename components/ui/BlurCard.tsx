import clsx from "clsx";
import React, { forwardRef } from "react";

interface BlurCardProps {
  children: React.ReactNode;
  className?: string;
}

const BlurCard = forwardRef<HTMLDivElement, BlurCardProps>(
  ({ children, className }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(
          "bg-white/5 backdrop-blur-sm border border-white/10",
          className,
        )}
      >
        {children}
      </div>
    );
  },
);

BlurCard.displayName = "BlurCard";

export default BlurCard;
