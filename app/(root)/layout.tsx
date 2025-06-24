import React, { ReactNode } from "react";
import Docker from "@/components/Docker";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      {children}
      <Docker />
    </div>
  );
};
export default Layout;
