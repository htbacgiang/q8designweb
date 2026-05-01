"use client";
import Image from 'next/image';

/**
 * SafeImage component that prevents ETIMEDOUT errors when loading external images
 * Uses unoptimized mode for external images to bypass server-side image optimization
 * which can timeout when fetching external images on VPS
 */
export default function SafeImage({ 
  src, 
  alt, 
  fill = false, 
  width, 
  height, 
  className = '', 
  priority = false,
  unoptimized: propUnoptimized = false,
  ...props 
}) {
  // Fallback image URL
  const fallbackImage = '/images/q8design/placeholder.jpg';
  const imageSrc = src || fallbackImage;

  // Check if image is external (starts with http:// or https://)
  // and is NOT from q8design.vn (same origin images should be optimized if possible)
  // Relative paths (starting with /) are always local and should be optimized
  const isExternal = imageSrc && 
    (imageSrc.startsWith('http://') || imageSrc.startsWith('https://')) &&
    !imageSrc.includes('q8design.vn');
  
  // Use unoptimized for external images (not from q8design.vn) to prevent timeout errors on VPS
  // This bypasses Next.js image optimizer which tries to fetch images server-side
  // and can cause ETIMEDOUT errors when the external server is slow or unreachable
  // Images from q8design.vn and relative paths will still be optimized by Next.js
  const shouldUnoptimize = propUnoptimized || isExternal;

  // Use Next.js Image with unoptimized for external images
  if (fill) {
    return (
      <Image
        src={imageSrc}
        alt={alt || ''}
        fill
        className={className}
        priority={priority}
        unoptimized={shouldUnoptimize}
        {...props}
      />
    );
  }

  return (
    <Image
      src={imageSrc}
      alt={alt || ''}
      width={width}
      height={height}
      className={className}
      priority={priority}
      unoptimized={shouldUnoptimize}
      {...props}
    />
  );
}

