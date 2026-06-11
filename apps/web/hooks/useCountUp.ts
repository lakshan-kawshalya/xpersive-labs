import { useEffect, useState } from "react";

export function useCountUp(target: number, duration = 2000, delay = 0, started = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!started) return;

    let animFrame: number;
    let startTime: number | null = null;

    const animate = (currentTime: number) => {
      if (startTime === null) startTime = currentTime + delay;
      if (currentTime < startTime) {
        animFrame = requestAnimationFrame(animate);
        return;
      }

      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));

      if (progress < 1) {
        animFrame = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    animFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrame);
  }, [started, target, duration, delay]);

  return count;
}
