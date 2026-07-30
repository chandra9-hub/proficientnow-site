import { createClient, SupabaseClient } from "@supabase/supabase-js";

// Connects the site to your Supabase project. The two values come from
// Vercel's Environment Variables (NEXT_PUBLIC_SUPABASE_URL and
// NEXT_PUBLIC_SUPABASE_ANON_KEY) — never hard-coded here.
// If they're missing, `supabase` is null and the careers pages show a
// friendly "not configured yet" message instead of crashing.
const url = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase: SupabaseClient | null =
  url && key ? createClient(url, key) : null;

export type Job = {
  id: string;
  title: string;
  sector: string | null;
  location: string | null;
  country: string | null;
  employment_type: string | null;
  salary_range: string | null;
  experience_required: string | null;
  department: string | null;
  description: string | null;
  responsibilities: string | null;
  requirements: string | null;
  benefits: string | null;
  working_hours: string | null;
  closing_date: string | null;
  featured: boolean | null;
  status: string | null;
  slug: string | null;
  created_at: string;
};
