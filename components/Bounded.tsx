import React from "react";
import { clsx } from "clsx";

interface BoundedProps {
  children: React.ReactNode;
  className?: string;
}

const Bounded = ({ children, className }: BoundedProps) => {
  return (
    <section className={clsx("container mx-auto px-4 2xl:px-0 py-12", className)}>
      {children}
    </section>
  );
};
export default Bounded;
