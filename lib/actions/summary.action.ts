"use server";

import { SummaryData } from "@/type";
import { supabaseClient } from "@/lib/supabase";
import { auth } from "@clerk/nextjs/server";

export const storeSummary = async (data: SummaryData) => {
  const supabase = await supabaseClient;
  const { userId } = await auth();

  const { data: summaryData, error } = await supabase
    .from("summaries")
    .insert([{ ...data, userId: userId, summary_count: 1 }])
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

export const getSummariesByUserId = async () => {
  const supabase = await supabaseClient;
  const { userId } = await auth();

  const { data, error } = await supabase
    .from("summaries")
    .select()
    .eq("userId", userId);

  if (error) throw new Error(error.message);

  return data;
};

export const checkSummaryPermission = async () => {
  const { userId } = await auth();
  const supabase = await supabaseClient;
  const { data: summary_count, error } = await supabase
    .from("summaries")
    .select("summary_count")
    .eq("userId", userId);

  if (error) throw new Error(error.message);

  if (Number(summary_count) < 1) {
    return { success: true, message: "You can generate" };
  } else {
    return { success: false, message: "You have reached the limit" };
  }
};

export const getAudioUrlFromSupabase = async (filePath: string) => {
  const supabase = await supabaseClient;
  const { data: urlData } = supabase.storage
    .from("audiofiles")
    .getPublicUrl(filePath);

  return urlData.publicUrl;
};
