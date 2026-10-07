"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const Player = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
  { ssr: false },
);

interface LottieAnimationProps {
  src: string;
  className?: string;
  style?: React.CSSProperties;
  loop?: boolean;
  autoplay?: boolean;
  fallback?: React.ReactNode;
  /** Gates the actual player mount (and its JS chunk fetch) — pass a
   * viewport-visibility flag so below-the-fold animations don't compete
   * with initial page load. Defaults to true for immediate playback. */
  active?: boolean;
}

export function LottieAnimation({
  src,
  className,
  style,
  loop = true,
  autoplay = true,
  fallback = null,
  active = true,
}: LottieAnimationProps) {
  const [failed, setFailed] = useState(false);

  if (failed || !active) return <>{fallback}</>;

  return (
    <Player
      src={src}
      className={className}
      style={style}
      loop={loop}
      autoplay={autoplay}
      onEvent={(event: string) => {
        if (event === "error") setFailed(true);
      }}
    />
  );
}
