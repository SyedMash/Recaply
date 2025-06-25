import { BiHome } from "react-icons/bi";
import { LuNotebookPen } from "react-icons/lu";
import { SummaryData } from "@/type";

export const navItems = [
  { name: "Home", path: "/", Icon: BiHome },
  { name: "Summary", path: "/your-summaries", Icon: LuNotebookPen },
];

export const dummySummary: SummaryData = {
  title: "The Dummy Summary",
  tldr: "This is the dummy summary",
  actionable_insights: ["something here", "also here"],
  key_points: ["key point 1", "key point 2"],
  conclusion: "conclusion",
};
