import { useRef } from "react";
import { useLayoutEffect } from "react";
import { useState } from "react";

export function Skeleton({ children, loading, isRoudendFull }: SkeletonProps) {
  const [, setWidth] = useState(0);
  const [, setHeight] = useState(0);
  const skeletonRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const element = skeletonRef.current;
    if (element) {
      setWidth(element.offsetWidth);
      setHeight(element.offsetHeight);
    }
  }, []);

  return (
    <div className="relative">
      {loading ? (
        <>
          <div
            className={`
            absolute top-0 left-0  bg-gray-300 animate-pulse 
            ${
              isRoudendFull
                ? "rounded-full w-16 h-16"
                : "w-full h-full rounded-md"
            }
            `}
          ></div>
          <div ref={skeletonRef} className="invisible w-full">
            {children}
          </div>
        </>
      ) : (
        <div>{children}</div>
      )}
    </div>
  );
}
