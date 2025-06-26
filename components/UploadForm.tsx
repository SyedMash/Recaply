"use client";

import React, { useState } from "react";
import { GoUpload } from "react-icons/go";
import { Button } from "@/components/ui/button";
import { SummaryData } from "@/type";
import {
  getAudioUrlFromSupabase,
  storeSummary,
} from "@/lib/actions/summary.action";
import { useRouter } from "next/navigation";
import { supabaseClient } from "@/lib/supabase";
import { useAuth } from "@clerk/nextjs";

interface UploadFormProps {
  isAllowed: boolean;
  message?: string;
}

const UploadForm = ({ isAllowed, message }: UploadFormProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);

    try {
      const supabase = await supabaseClient;
      const { data: audioData, error } = await supabase.storage
        .from("audiofiles")
        .upload(file.name, file, {
          upsert: true,
        });
      if (error) throw new Error(error.message);

      const audioUrl = await getAudioUrlFromSupabase(audioData?.path);
      console.log(audioUrl);

      console.log("Sending request with audio URL:", audioUrl); // Debug log

      const response = await fetch(
        "https://ai-podcast-fastapi-backend.vercel.app/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            audio_url: audioUrl,
          }),
        },
      );

      // Add error handling for non-200 responses
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Server response:", response.status, errorText);
        throw new Error(`Server error: ${response.status} - ${errorText}`);
      }

      const data: SummaryData = await response.json();
      const storedData = await storeSummary(data);
      if (storedData[0].id) {
        router.push(`/summary/${storedData[0].id}`);
      }
    } catch (err) {
      console.error("Error in handleUpload:", err);
      // Show error to user
      alert(
        `Upload failed: ${err instanceof Error ? err.message : "Unknown error"}`,
      );
    } finally {
      setLoading(false);
      setFile(null);
    }
  };

  return (
    <>
      <figure className={"flex items-center gap-6 rounded-2xl border p-3"}>
        <div className={"flex items-center gap-6 rounded-2xl bg-black/50 p-3"}>
          <GoUpload size={48} />
          <input
            type="file"
            accept="audio/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className={"cursor-pointer"}
            disabled={isAllowed}
          />
        </div>
      </figure>
      <Button onClick={handleUpload} className={"my-6"} disabled={isAllowed}>
        {loading ? "Processing..." : "Upload & Summarize"}
      </Button>
      <p className={"text-lg font-semibold text-red-300"}>{message}</p>
      <p className={"mt-6 max-w-3xl text-center text-lg text-balance"}>
        This audio will not be saved in our database. This will only be used to
        generate a summary. Once you leave this page this audio will be deleted.
      </p>
    </>
  );
};
export default UploadForm;
