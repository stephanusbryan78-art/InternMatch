import React from 'react';

interface LogoProps {
  variant?: 'horizontal' | 'vertical' | 'icon-only';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  className?: string;
  onClick?: () => void;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'horizontal',
  size = 'md',
  showTagline = false,
  className = '',
  onClick,
}) => {
  // Dimensions for the icon
  const iconDimensions = {
    sm: { size: 30 },
    md: { size: 40 },
    lg: { size: 52 },
    xl: { size: 68 },
  }[size];

  const textSize = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl',
  }[size];

  const taglineSize = {
    sm: 'text-[9px]',
    md: 'text-[11px]',
    lg: 'text-xs',
    xl: 'text-sm',
  }[size];

  // Exact reproduction of the uploaded InternMatch app icon from image.png:
  // - Rounded squircle container with vibrant emerald green gradient
  // - Rolling lighter green landscape hill contours in the lower background
  // - Clean, solid white winding path emerging from the bottom that curves left and transforms into an upward-right arrow (↗)
  const AppIcon = (
    <svg
      width={iconDimensions.size}
      height={iconDimensions.size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="shrink-0 transition-transform duration-200 group-hover:scale-105 drop-shadow-sm select-none"
    >
      <defs>
        <clipPath id="imSquircleClip">
          <rect x="2" y="2" width="96" height="96" rx="24" />
        </clipPath>

        {/* Vibrant emerald/teal green gradient matching image.png */}
        <linearGradient id="imGreenBgGrad" x1="15%" y1="5%" x2="85%" y2="95%">
          <stop offset="0%" stopColor="#00B873" />
          <stop offset="45%" stopColor="#00A865" />
          <stop offset="100%" stopColor="#008F52" />
        </linearGradient>

        {/* Soft lighter green hill landscape overlay */}
        <linearGradient id="imHillLight" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#44E29E" stopOpacity="0.36" />
          <stop offset="100%" stopColor="#10B981" stopOpacity="0.12" />
        </linearGradient>
      </defs>

      {/* Main squircle container */}
      <rect
        x="2"
        y="2"
        width="96"
        height="96"
        rx="24"
        fill="url(#imGreenBgGrad)"
      />

      {/* Background landscape & road layers clipped to squircle */}
      <g clipPath="url(#imSquircleClip)">
        {/* Lower background rolling hill contour (lighter mint green) */}
        <path
          d="M -5 66 C 20 58, 44 56, 70 62 C 86 65, 96 64, 105 61 L 105 105 L -5 105 Z"
          fill="url(#imHillLight)"
        />

        {/* Lower right subtle hill depth */}
        <path
          d="M 36 64 C 54 58, 76 60, 105 70 L 105 105 L 36 105 Z"
          fill="#006C3E"
          opacity="0.16"
        />

        {/* 
          The White Road and Upward Arrow (Jalur & Arah ke Atas)
          - Enters wide from the bottom edge
          - Curves smoothly upwards to the left in perspective
          - Sweeps rightward and upward toward the sky
          - Terminates in a sharp, crisp arrowhead pointing diagonally up-right (↗)
        */}
        <path
          d="M 28.5 98 
             C 33 87, 37.5 75, 26 66 
             C 22.5 62.5, 22.5 57.5, 26.5 54.5 
             C 31 51, 39.5 45.5, 49.5 39.5 
             L 50 34 
             L 62.5 32 
             L 60.5 47.5 
             L 55.5 44 
             C 47.5 48.5, 40 54, 36.5 59 
             C 34 63, 36 71.5, 41 79.5 
             C 45 85.5, 49 91.5, 51.5 98 
             Z"
          fill="#FFFFFF"
        />
      </g>
    </svg>
  );

  const Wordmark = (
    <div className={`flex flex-col ${variant === 'vertical' ? 'items-center text-center mt-2' : 'justify-center'}`}>
      <div className={`font-bold tracking-tight ${textSize} leading-none select-none font-['Plus_Jakarta_Sans',sans-serif]`}>
        <span className="text-[#0B1E36] font-extrabold tracking-[-0.03em]">Intern</span>
        <span className="text-[#00A865] font-extrabold tracking-[-0.03em]">Match</span>
      </div>
      {showTagline && (
        <span className={`${taglineSize} font-medium text-[#475569] mt-1 tracking-tight max-w-[260px] leading-tight`}>
          Platform Karier Berbasis AI dan Community untuk Talent Vokasi
        </span>
      )}
    </div>
  );

  if (variant === 'icon-only') {
    return (
      <div
        onClick={onClick}
        className={`inline-flex items-center justify-center ${onClick ? 'cursor-pointer' : ''} ${className}`}
        title="InternMatch"
      >
        {AppIcon}
      </div>
    );
  }

  if (variant === 'vertical') {
    return (
      <div
        onClick={onClick}
        className={`inline-flex flex-col items-center group ${onClick ? 'cursor-pointer' : ''} ${className}`}
      >
        {AppIcon}
        {Wordmark}
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-3 group ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {AppIcon}
      {Wordmark}
    </div>
  );
};
