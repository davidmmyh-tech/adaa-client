import { useEffect, useState } from 'react';

export default function useCountDown({ initial = 60, interval = 60 }: { initial?: number; interval?: number }) {
  const [countdown, setCountdown] = useState(initial);
  const [isCounting, setIsCounting] = useState(initial > 0);

  useEffect(() => {
    if (countdown === 0) {
      setIsCounting(false);
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  const restart = () => {
    setCountdown(interval);
    setIsCounting(true);
  };

  return { countdown, isCounting, restart };
}
