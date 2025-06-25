import React, { ReactNode } from "react";
import Image from "next/image";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className={"flex h-screen flex-col lg:flex-row"}>
      <div className={"relative h-1/4 flex-1 grow lg:h-full"}>
        <Image
          src={"/images/auth-image.png"}
          alt={"auth-image"}
          fill={true}
          className={"object-cover"}
        />
        <div className={"absolute bottom-5 left-5 hidden lg:block"}>
          <h1 className={"text-5xl font-bold"}>RECAPLY</h1>
          <p className={"text-muted-foreground mt-2 text-xl font-semibold"}>
            An AI Podcast Summarizer
          </p>
        </div>
      </div>
      <div
        className={"flex h-3/4 flex-1 items-center justify-center lg:h-full py-12"}
      >
        {children}
      </div>
    </main>
  );
};
export default AuthLayout;
