import React from "react";
import { navItems } from "@/constants";
import Link from "next/link";
import { ModeToggle } from "@/components/ToggleTheme";

const Docker = () => {
  return (
    <div
      className={
        "fixed bottom-5 left-2/4 flex -translate-x-2/4 transform items-center justify-between gap-6 rounded-2xl border border-white/20 bg-black/50 px-3 py-2 backdrop-blur-2xl"
      }
    >
      <h1 className={"text-xl font-black"}>RECAPLY</h1>
      <div className={"flex items-center gap-6"}>
        {navItems.map((item, idx: number) => {
          const { Icon } = item;
          return (
            <Link href={item.path} key={idx}>
              <Icon
                size={24}
                className={"transition-all duration-300 hover:scale-120"}
              />
            </Link>
          );
        })}
        <ModeToggle />
      </div>
    </div>
  );
};
export default Docker;
