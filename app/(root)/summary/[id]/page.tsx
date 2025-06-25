import React from "react";
import Bounded from "@/components/Bounded";
import { getSummary } from "@/lib/actions/summary.action";
import { SummaryData } from "@/type";

interface SummaryPageProps {
  params: Promise<{ id: string }>;
}

const Page = async ({ params }: SummaryPageProps) => {
  const { id } = await params;
  const summary: SummaryData = await getSummary({ id });

  return (
    <Bounded className={"min-h-screen"}>
      <div className="mx-auto max-w-4xl space-y-8 rounded-2xl bg-gradient-to-br from-[#111] to-[#1a1a1a] px-6 py-12 text-white shadow-2xl">
        <h2 className="text-center text-2xl font-semibold tracking-widest text-gray-300">
          SUMMARY
        </h2>

        <h1 className="text-center text-3xl font-bold text-white sm:text-4xl">
          {summary.title}
        </h1>
        <p className="mx-auto max-w-3xl text-center text-lg leading-relaxed text-gray-300">
          {summary.tldr}
        </p>
        <div className="mt-6 grid grid-cols-1 gap-6">
          <h1
            className={"text-center text-3xl font-bold text-white sm:text-4xl"}
          >
            Key Points
          </h1>
          <ul className="list-inside list-disc space-y-3 text-base text-gray-200">
            {summary.key_points.map((point, idx: number) => (
              <li key={idx}>{point}</li>
            ))}
          </ul>
          <h1
            className={"text-center text-3xl font-bold text-white sm:text-4xl"}
          >
            Actionable Insights
          </h1>
          <ul className="list-inside list-disc space-y-3 text-base text-gray-200">
            {summary.actionable_insights.map((insights, idx: number) => (
              <li key={idx}>{insights}</li>
            ))}
          </ul>
        </div>

        <p className="border-t border-gray-700 pt-8 text-center text-base text-gray-400 italic">
          {summary.conclusion}
        </p>

        {/*  notion import option*/}
      </div>
    </Bounded>
  );
};
export default Page;
