import { cache } from "react";
import { supabase, type Job, type Post } from "./supabase";

// Server-side reads. A hard timeout means an unreachable Supabase yields null, never a hung page.
const TIMEOUT_MS = 5000;

type Result = PromiseLike<{ data: unknown; error: unknown }>;

async function run<T>(query: (signal: AbortSignal) => Result): Promise<T | null> {
  if (!supabase) return null;
  try {
    const { data, error } = await query(AbortSignal.timeout(TIMEOUT_MS));
    return error ? null : (data as T);
  } catch {
    return null;
  }
}

export const getPosts = cache((type: "news" | "blog") =>
  run<Post[]>((signal) =>
    supabase!.from("posts").select("*").eq("type", type).eq("status", "published")
      .order("published_at", { ascending: false }).abortSignal(signal)));

export const getPost = cache((type: "news" | "blog", slug: string) =>
  run<Post>((signal) =>
    supabase!.from("posts").select("*").eq("type", type).eq("slug", slug).eq("status", "published")
      .abortSignal(signal).maybeSingle()));

export const getJobs = cache(() =>
  run<Job[]>((signal) =>
    supabase!.from("jobs").select("*").eq("status", "published")
      .order("featured", { ascending: false }).order("created_at", { ascending: false }).abortSignal(signal)));

export const getJob = cache((slug: string) =>
  run<Job>((signal) =>
    supabase!.from("jobs").select("*").eq("slug", slug).eq("status", "published")
      .abortSignal(signal).maybeSingle()));
