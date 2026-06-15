import { useEffect, useState } from 'react';

const imageProxy = (src) => `https://images.weserv.nl/?url=${encodeURIComponent(src)}`;

export default function FallbackImage({
  src,
  originalSrc,
  alt,
  className = '',
  imgClassName = '',
  imgProps = {},
  ...props
}) {
  const [failed, setFailed] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);
  const [useProxy, setUseProxy] = useState(false);

  useEffect(() => {
    setFailed(false);
    setCurrentSrc(src);
    setUseProxy(false);
  }, [src]);

  const handleError = () => {
    if (!useProxy) {
      setUseProxy(true);
      setCurrentSrc(imageProxy(originalSrc || src));
      return;
    }

    setFailed(true);
  };

  if (failed) {
    return (
      <div
        className={`img-fallback ${className}`}
        role="img"
        aria-label={`${alt} unavailable`}
        {...props}
      >
        <span className="px-4 text-center text-sm font-bold uppercase tracking-[0.2em]">
          Image unavailable
        </span>
      </div>
    );
  }

  return (
    <div className={className} {...props}>
      <img
        src={currentSrc}
        alt={alt}
        className={imgClassName}
        loading="eager"
        decoding="async"
        {...imgProps}
        onError={handleError}
      />
    </div>
  );
}
