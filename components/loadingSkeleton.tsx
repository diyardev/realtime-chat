import { Skeleton } from "@nextui-org/react";
import React from "react";

const SkeletonWhile = () => {
  let skeletons = [];

  for (let i = 0; i < 8; i++) {
    if (i === 2 || i === 5 || i === 8) {
      skeletons.push(
        <div
          key={i}
          style={{ float: "right" }}
          className="max-w-[300px] my-3 w-full flex items-center gap-3"
        >
          <div className="w-full">
            <Skeleton
              style={{ float: "right" }}
              className="mb-3 h-2 w-3/5 rounded-lg"
            />
            <Skeleton
              style={{ float: "right" }}
              className="h-4 w-4/5 rounded-lg"
            />
          </div>
          <div>
            <Skeleton className="flex rounded-full w-10 h-10" />
          </div>
        </div>
      );
    } else {
      skeletons.push(
        <div
          key={i}
          className="max-w-[300px] my-3 w-full flex items-center gap-3"
        >
          <div>
            <Skeleton className="flex rounded-full w-10 h-10" />
          </div>
          <div className="w-full flex flex-col gap-2">
            <Skeleton className="h-2 w-3/5 rounded-lg" />
            <Skeleton className="h-4 w-4/5 rounded-lg" />
          </div>
        </div>
      );
    }
  }

  return <>{skeletons}</>;
};

function LoadingSkeleton() {
  return (
    <>
      <SkeletonWhile />
    </>
  );
}


export default LoadingSkeleton;
