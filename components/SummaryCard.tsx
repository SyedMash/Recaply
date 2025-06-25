import React from "react";
import Link from "next/link";

interface SummaryCardProps {
  id: string;
  title: string;
  created_at: string;
}

const SummaryCard = ({ id, title, created_at }: SummaryCardProps) => {
  return (
    <Link
      className={"h-fit w-fit rounded-2xl border p-6"}
      href={`/summary/${id}`}
    >
      <h1 className={"text-lg font-semibold"}>{title}</h1>
      <p className={"mt-6 text-base text-neutral-400"}>
        Created at: {created_at.split("T")[0]}
      </p>
    </Link>
  );
};
export default SummaryCard;
