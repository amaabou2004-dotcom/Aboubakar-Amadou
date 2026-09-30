import React, { useState } from 'react';
import { getOptimizedImageUrl, ImageOptimizationOptions } from '../lib/imageOptimization';

export interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackSrc?: string;
  webpSrc?: string;
  transform?: ImageOptimizationOptions;
  priority?: boolean;
  className?: string;
  containerClassName?: string;
}

/**
 * High-performance responsive image component serving WebP formats with fallback
 */
export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  fallbackSrc,
  webpSrc,
  transform,
  priority = false,
  className = '',
  containerClassName = '',
  onError,
  onLoad,
  ...restProps
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Compute WebP source and standard source
  let resolvedWebp = webpSrc;
  let resolvedMain = src;

  // If transformation options are provided, route through the optimization endpoint
  if (transform) {
    resolvedWebp = getOptimizedImageUrl(src, { ...transform, format: 'webp' });
    resolvedMain = resolvedWebp;
  } else if (!resolvedWebp && (src.endsWith('.jpg') || src.endsWith('.jpeg') || src.endsWith('.png'))) {
    // Attempt automatic WebP sibling
    resolvedWebp = src.replace(/\.(jpg|jpeg|png)$/, '.webp');
  }

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (!hasError && (fallbackSrc || resolvedMain !== src)) {
      setHasError(true);
      if (fallbackSrc) {
        (e.currentTarget as HTMLImageElement).src = fallbackSrc;
      }
    }
    if (onError) onError(e);
  };

  const handleImgLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setIsLoaded(true);
    if (onLoad) onLoad(e);
  };

  return (
    <picture className={`inline-block ${containerClassName}`}>
      {/* WebP source for browsers with WebP support */}
      {resolvedWebp && !hasError && (
        <source type="image/webp" srcSet={resolvedWebp} />
      )}
      <img
        src={hasError && fallbackSrc ? fallbackSrc : resolvedMain}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        // @ts-ignore fetchPriority is a valid modern HTML attribute
        fetchpriority={priority ? 'high' : 'auto'}
        onLoad={handleImgLoad}
        onError={handleImgError}
        className={`${className} transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-90'
        }`}
        {...restProps}
      />
    </picture>
  );
};
