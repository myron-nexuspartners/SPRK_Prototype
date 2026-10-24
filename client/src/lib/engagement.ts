import { createClient } from "@supabase/supabase-js";

/**
 * Live engagement backend (comments, reactions, views) for pipeline articles.
 * The publishable key is browser-safe by design; write access is constrained
 * by Row Level Security policies on the Supabase side.
 */
const SUPABASE_URL = "https://vrzzqjzgkavzprurfujb.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_gKb78gDwzEffKW1hpQjnFg_itYpK0oo";

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

export interface LiveComment {
  id: string;
  article_id: string;
  author_name: string;
  body: string;
  created_at: string;
}

export interface EngagementCounts {
  views: number;
  like: number;
  upvote: number;
  share: number;
  save: number;
}

export async function incrementView(articleId: string): Promise<number | null> {
  const { data, error } = await supabase.rpc("increment_view", { aid: articleId });
  if (error) return null;
  return typeof data === "number" ? data : null;
}

export async function fetchEngagement(articleId: string): Promise<EngagementCounts> {
  const counts: EngagementCounts = { views: 0, like: 0, upvote: 0, share: 0, save: 0 };
  const [viewsRes, reactionsRes] = await Promise.all([
    supabase.from("article_views").select("views").eq("article_id", articleId).maybeSingle(),
    supabase.from("article_reactions").select("kind").eq("article_id", articleId),
  ]);
  if (viewsRes.data?.views) counts.views = Number(viewsRes.data.views);
  for (const row of reactionsRes.data ?? []) {
    const kind = row.kind as keyof Omit<EngagementCounts, "views">;
    if (kind in counts) counts[kind] += 1;
  }
  return counts;
}

export async function addReaction(articleId: string, kind: "like" | "upvote" | "share" | "save") {
  const { error } = await supabase.from("article_reactions").insert({ article_id: articleId, kind });
  return !error;
}

export async function fetchComments(articleId: string): Promise<LiveComment[]> {
  const { data } = await supabase
    .from("article_comments")
    .select("*")
    .eq("article_id", articleId)
    .order("created_at", { ascending: false })
    .limit(100);
  return (data ?? []) as LiveComment[];
}

export async function addComment(articleId: string, authorName: string, body: string) {
  const trimmedBody = body.trim();
  const trimmedName = authorName.trim() || "Guest";
  if (trimmedBody.length < 2) return null;
  const { data, error } = await supabase
    .from("article_comments")
    .insert({ article_id: articleId, author_name: trimmedName.slice(0, 60), body: trimmedBody.slice(0, 2000) })
    .select()
    .single();
  if (error) return null;
  return data as LiveComment;
}
