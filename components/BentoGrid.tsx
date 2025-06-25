import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import { FaHeadphonesAlt } from "react-icons/fa";
import { FaEarlybirds } from "react-icons/fa";
import { GiBrain } from "react-icons/gi";
import { FaRepeat } from "react-icons/fa6";

const features = [
  {
    Icon: FaHeadphonesAlt,
    name: "Upload & Transcribe Instantly",
    description:
      "Turn any podcast episode into accurate text with just one click.",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-1",
  },
  {
    Icon: FaRepeat,
    name: "History & Saved Summaries",
    description: "Never lose a summary again",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-2",
  },
  {
    Icon: GiBrain,
    name: "Smart AI Summarization",
    description: "Skip the fluff — get concise, GPT-powered summaries.\n",
    href: "#",
    cta: "Learn more",
    className: "col-span-3 lg:col-span-2",
  },
  {
    Icon: FaEarlybirds,
    name: "Repurpose into Content",
    description:
      "Convert episodes into tweet threads, LinkedIn posts, or blog outlines.\n",
    className: "col-span-3 lg:col-span-1",
    href: "#",
    cta: "Learn more",
  },
];

export function BentoGridTemplate() {
  return (
    <BentoGrid>
      {features.map((feature, idx) => (
        <BentoCard key={idx} {...feature} background={""} />
      ))}
    </BentoGrid>
  );
}
