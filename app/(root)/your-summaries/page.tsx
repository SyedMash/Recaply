import React from "react";
import Bounded from "@/components/Bounded";
import { getSummariesByUserId } from "@/lib/actions/summary.action";
import SummaryCard from "@/components/SummaryCard";
import { redirect } from "next/navigation";
import { SupabaseData } from "@/type";

const Page = async () => {
  const summaries: SupabaseData[] = await getSummariesByUserId();
  if (!summaries) redirect("/create-summary");
  console.log(summaries);

  return (
    <Bounded>
      <h1 className={"text-center text-4xl font-bold uppercase"}>
        You Summaries
      </h1>

      <div
        className={"mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"}
      >
        {summaries.map((summary, idx: number) => (
          <SummaryCard
            key={idx}
            id={summary.id}
            title={summary.title}
            created_at={summary.created_at}
          />
        ))}
      </div>
    </Bounded>
  );
};
export default Page;
