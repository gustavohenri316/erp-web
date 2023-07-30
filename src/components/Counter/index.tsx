import React, { useState, useEffect } from "react";

export const Counter: React.FC<CounterProps> = ({
  initialSeconds,
  onCountdownEnd,
}) => {
  const [seconds, setSeconds] = useState<number>(initialSeconds);
  const [isCountdownOver, setIsCountdownOver] = useState<boolean>(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => {
        if (prevSeconds > 0) {
          return prevSeconds - 1;
        } else {
          setIsCountdownOver(true);
          clearInterval(interval);
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isCountdownOver) {
      onCountdownEnd();
    }
  }, [isCountdownOver, onCountdownEnd]);

  const formattedTime = `${Math.floor(seconds / 60)}:${String(
    seconds % 60
  ).padStart(2, "0")}`;

  return <>{formattedTime}</>;
};
