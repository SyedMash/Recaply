export type SummaryData = {
  title: string;
  tldr: string;
  key_points: string[];
  actionable_insights: string[];
  conclusion: string;
};

export interface SupabaseData extends SummaryData {
  userId: string;
  summary_count: number;
  created_at: string;
  id: string;
}
