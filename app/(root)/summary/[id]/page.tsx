import React from "react";
import Bounded from "@/components/Bounded";
import { getSummary } from "@/lib/actions/summary.action";

interface SummaryPageProps {
  params: Promise<{ id: string }>;
}

const Page = async ({ params }: SummaryPageProps) => {
  const { id } = await params;
  const summary = await getSummary({ id });

  return (
    <Bounded className={"min-h-screen"}>
      <h1 className={"text-center text-3xl font-bold uppercase"}>Summary</h1>
      <div className={"mt-12"}>
        <h1 className={"text-2xl font-bold lg:text-4xl"}>
          Title: {summary.title}
        </h1>
        <p className={"mt-12 text-xl text-balance"}>{summary.tldr}</p>
        <ul className={"mt-12 list-disc"}>
          {summary.key_points.map((point, idx) => (
            <li key={idx} className={"text-xl"}>
              {point}
            </li>
          ))}
        </ul>
        <ul className={"mt-12 list-disc"}>
          {summary.actionable_insights.map((insight, idx) => (
            <li key={idx} className={"text-xl"}>
              {insight}
            </li>
          ))}
        </ul>
        <p className={"mt-12 text-xl text-balance"}>{summary.conclusion}</p>
      </div>
    </Bounded>
  );
};
export default Page;
