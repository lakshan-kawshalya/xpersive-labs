"use client";

import { useState } from "react";
import { Player } from "@lottiefiles/react-lottie-player";

interface LottieAnimationProps {
  src: string;
  className?: string;
  style?: React.CSSProperties;
  loop?: boolean;
  autoplay?: boolean;
  fallback?: React.ReactNode;
}

export function LottieAnimation({
  src,
  className,
  style,
  loop = true,
  autoplay = true,
  fallback = null,
}: LottieAnimationProps) {
  const [failed, setFailed] = useState(false);

  if (failed) return <>{fallback}</>;

  return (
    <Player
      src={src}
      className={className}
      style={style}
      loop={loop}
      autoplay={autoplay}
      onEvent={(event) => {
        if (event === "error") setFailed(true);
      }}
    />
  );
}
