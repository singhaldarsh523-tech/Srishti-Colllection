import { useState } from 'react';
import { Sparkles } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
}

export function ResilientImage({
  src,
  alt,
  className = 'w-full h-full object-cover',
  fallbackTitle,
}: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className="w-full h-full bg-gradient-to-br from-[#F3F1EC] via-[#EAE5DC] to-[#DFD8CC] flex flex-col items-center justify-center p-6 text-center select-none"
        role="img"
        aria-label={alt}
      >
        <div className="w-10 h-10 rounded-full border border-[#9A7B3E]/40 flex items-center justify-center mb-3 text-[#8C1D2D]">
          <Sparkles className="w-4 h-4" />
        </div>
        <span className="font-display text-lg text-[#1C1917] leading-snug">
          {fallbackTitle || 'Srishti Collection'}
        </span>
        <span className="text-xs text-[#57534E] mt-1">Handcrafted Indian Wear</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
      loading="lazy"
    />
  );
}
