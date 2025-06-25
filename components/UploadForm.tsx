"use client";

import React, { useState } from "react";
import { GoUpload } from "react-icons/go";
import { Button } from "@/components/ui/button";
import { SummaryData } from "@/type";
import { storeSummary } from "@/lib/actions/summary.action";
import { useRouter } from "next/navigation";

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

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(
        "https://ai-podcast-fastapi-backend.vercel.app/transcribe",
        {
          method: "POST",
          body: formData,
        },
      );

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Server Error: ${res.status} - ${errText}`);
      }
      const data: SummaryData = await res.json();
      console.log("Received from API:", data);

      const storedData = await storeSummary(data);
      if (storedData[0].id) {
        router.push(`/summary/${storedData[0].id}`);
      }
    } catch (err) {
      console.error("Error in handleUpload:", err);
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
