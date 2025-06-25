"use server";

import { SummaryData } from "@/type";
import { supabaseClient } from "@/lib/supabase";

export const storeSummary = async (data: SummaryData) => {
  const supabase = await supabaseClient;
  const { data: summaryData, error } = await supabase
    .from("summaries")
    .insert([data])
    .select();

  if (error) throw Error(error.message);

  return summaryData;
};

export const getSummary = async ({ id }: { id: string }) => {
  const supabase = await supabaseClient;
  const { data, error } = await supabase
    .from("summaries")
    .select()
    .eq("id", id)
    .select();

  if (error) throw Error(error.message);

  return data[0];
};
