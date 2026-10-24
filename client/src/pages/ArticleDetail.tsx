import React, { useEffect, useMemo, useState } from "react";
import { Link, useRoute } from "wouter";
import { ArrowLeft, Bookmark, ExternalLink, Eye, Heart, MessageCircle, Reply, Share2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import FeedShell from "@/components/FeedShell";
import { authorAvatar, getStaffAuthor, EDITORIAL_DISCLOSURE } from "@/data/authors";
import { feedPosts, getFeedPost, type FeedPost } from "@/data/feedContent";
import { addComment, addReaction, fetchComments, fetchEngagement, incrementView, type EngagementCounts, type LiveComment } from "@/lib/engagement";

const comments = [
  { handle: "@JadeMelt", body: "Great article. The context makes the post feel like a real community scene, not just another feed hit.", likes: 45, replies: ["@DropSignal: Exactly. The lore is the launch."] },
  { handle: "@MockUpMars", body: "The article treatment is clean. I would love a creator map next.", likes: 31, replies: [] },
  { handle: "@PavilionBacker", body: "This is why rights and rev-share clarity matter before hype hits scale.", likes: 24, replies: ["@SPRKDesk: Pavilion context is coming in the next brief."] },
];

/** Renders inline **bold** spans within body text. */
function InlineText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, index) =>
        part.startsWith("**") && part.endsWith("**") ? (
          <strong key={index} className="font-bold text-[#0A0A0F]">{part.slice(2, -2)}</strong>
        ) : (
          <React.Fragment key={index}>{part}</React.Fragment>
        ),
      )}
    </>
  );
}

/**
 * Body block renderer. Conventions in article JSON `body` strings:
 * "## Heading" → subhead · lines starting with "- " → bulleted list ·
 * lines starting with "1. " → numbered list · anything else → paragraph.
 */
function ArticleBlock({ block }: { block: string }) {
  if (block.startsWith("## ")) {
    return <h2 className="mb-4 mt-10 text-2xl font-extrabold tracking-[-0.03em] text-[#0A0A0F]">{block.slice(3)}</h2>;
  }
  const lines = block.split("\n").map((line) => line.trim()).filter(Boolean);
  if (lines.length > 1 && lines.every((line) => line.startsWith("- "))) {
    return (
      <ul className="mb-6 space-y-3 pl-1">
        {lines.map((line, index) => (
          <li key={index} className="flex gap-3 text-[17px] font-light leading-[1.7] text-[#0A0A0F]">
            <span className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#FF6B35]" />
            <span><InlineText text={line.slice(2)} /></span>
          </li>
        ))}
      </ul>
    );
  }
  if (lines.length > 1 && lines.every((line) => /^\d+\.\s/.test(line))) {
    return (
      <ol className="mb-6 space-y-3 pl-1">
        {lines.map((line, index) => (
          <li key={index} className="flex gap-3 text-[17px] font-light leading-[1.7] text-[#0A0A0F]">
            <span className="mt-0.5 shrink-0 font-display text-base font-extrabold text-[#FF6B35]">{index + 1}.</span>
            <span><InlineText text={line.replace(/^\d+\.\s/, "")} /></span>
          </li>
        ))}
      </ol>
    );
  }
  return (
    <p className="mb-6 text-[17px] font-light leading-[1.75] text-[#0A0A0F]">
      <InlineText text={block} />
    </p>
  );
}

function ArticleHeroImage({ post }: { post: FeedPost }) {
  return (
    <div className="relative my-6 flex min-h-[310px] items-end overflow-hidden rounded-2xl bg-[#1E2235] text-white md:min-h-[390px]">
      <img src={post.image} alt={post.imageAlt} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0F]/86 via-[#0A0A0F]/38 to-[#FF6B35]/18" />
      <div className="absolute right-8 top-8 flex h-24 w-24 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white/85 backdrop-blur-sm"><Sparkles className="h-12 w-12" /></div>
      <div className="relative z-10 max-w-xl p-6 md:p-8">
        <span className="label-caps rounded-full bg-[#0A0A0F]/55 px-3 py-1 text-[#F5F0EB] backdrop-blur-sm">{post.contentType} · {post.category}</span>
      </div>
    </div>
  );
}

function ArticleEngagement({ post }: { post: FeedPost }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  return (
    <div className="my-6 flex flex-wrap items-center gap-2 rounded-2xl border border-black/5 bg-[#F5F0EB] p-3 text-xs font-semibold text-[#4A5278]">
      <button onClick={() => toast.success("Upvoted.")} className="rounded-full bg-white px-3 py-2 hover:text-[#0A0A0F]">↑ {post.likes}</button>
      <button onClick={() => toast("Jumping to comments…")} className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-2 hover:text-[#0A0A0F]"><MessageCircle className="h-3.5 w-3.5" /> {post.comments}</button>
      <button onClick={() => { setLiked(!liked); toast.success(liked ? "Like removed." : "Article liked."); }} className={`inline-flex items-center gap-1 rounded-full bg-white px-3 py-2 hover:text-[#CC0055] ${liked ? "text-[#CC0055]" : ""}`}><Heart className={`h-3.5 w-3.5 ${liked ? "fill-current" : ""}`} /> {liked ? "Liked" : "Like"}</button>
      <button onClick={() => toast.success("Article link copied.")} className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-2 hover:text-[#0A0A0F]"><Share2 className="h-3.5 w-3.5" /> {post.shares}</button>
      <button onClick={() => { setSaved(!saved); toast.success(saved ? "Bookmark removed." : "Article bookmarked."); }} className={`ml-auto inline-flex items-center gap-1 rounded-full bg-white px-3 py-2 hover:text-[#FF6B35] ${saved ? "text-[#FF6B35]" : ""}`}><Bookmark className={`h-3.5 w-3.5 ${saved ? "fill-current" : ""}`} /> Save</button>
    </div>
  );
}

function ArticleTagRow({ post }: { post: FeedPost }) {
  if (!post.tags) return null;
  const chips = [
    ...post.tags.topics.map((topic) => ({ label: topic, kind: "Topic" })),
    ...post.tags.audience.map((aud) => ({ label: aud, kind: "Audience" })),
    { label: post.tags.geography, kind: "Geo" },
    { label: post.tags.activityType, kind: "Activity" },
  ];
  return (
    <div className="mt-5 flex flex-wrap gap-2">
      {chips.map((chip) => (
        <span key={`${chip.kind}-${chip.label}`} className="inline-flex items-center gap-1.5 rounded-full bg-[#F5F0EB] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-[#4A5278]">
          <span className="text-[#FF6B35]">{chip.kind}</span> {chip.label}
        </span>
      ))}
    </div>
  );
}

function ArticleSources({ post }: { post: FeedPost }) {
  if (!post.sources || post.sources.length === 0) return null;
  return (
    <aside className="my-8 rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
      <span className="label-caps text-[#FF6B35]">Sources &amp; further reading</span>
      <ul className="mt-3 space-y-2">
        {post.sources.map((source) => (
          <li key={source.url}>
            <a href={source.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold text-[#4A5278] underline underline-offset-4 hover:text-[#0A0A0F]">
              <ExternalLink className="h-3.5 w-3.5 shrink-0 text-[#FF6B35]" /> {source.label}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  );
}

function LiveEngagement({ post, counts, onReact }: { post: FeedPost; counts: EngagementCounts; onReact: (kind: "like" | "upvote" | "share" | "save") => void }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  return (
    <div className="my-6 flex flex-wrap items-center gap-2 rounded-2xl border border-black/5 bg-[#F5F0EB] p-3 text-xs font-semibold text-[#4A5278]">
      <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-2"><Eye className="h-3.5 w-3.5 text-[#FF6B35]" /> {counts.views.toLocaleString()}</span>
      <button onClick={() => { onReact("upvote"); toast.success("Upvoted."); }} className="rounded-full bg-white px-3 py-2 hover:text-[#0A0A0F]">↑ {counts.upvote.toLocaleString()}</button>
      <button
        onClick={() => {
          if (!liked) { setLiked(true); onReact("like"); toast.success("Article liked."); }
        }}
        className={`inline-flex items-center gap-1 rounded-full bg-white px-3 py-2 hover:text-[#CC0055] ${liked ? "text-[#CC0055]" : ""}`}
      >
        <Heart className={`h-3.5 w-3.5 ${liked ? "fill-current" : ""}`} /> {counts.like.toLocaleString()}
      </button>
      <button
        onClick={() => {
          onReact("share");
          navigator.clipboard?.writeText(window.location.href).catch(() => undefined);
          toast.success("Article link copied.");
        }}
        className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-2 hover:text-[#0A0A0F]"
      >
        <Share2 className="h-3.5 w-3.5" /> {counts.share.toLocaleString()}
      </button>
      <button
        onClick={() => {
          if (!saved) { setSaved(true); onReact("save"); toast.success("Article bookmarked."); }
        }}
        className={`ml-auto inline-flex items-center gap-1 rounded-full bg-white px-3 py-2 hover:text-[#FF6B35] ${saved ? "text-[#FF6B35]" : ""}`}
      >
        <Bookmark className={`h-3.5 w-3.5 ${saved ? "fill-current" : ""}`} /> Save
      </button>
    </div>
  );
}

function timeAgo(iso: string) {
  const seconds = Math.max(1, Math.floor((Date.now() - new Date(iso).getTime()) / 1000));
  if (seconds < 60) return `${seconds}s ago`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

function LiveComments({ post }: { post: FeedPost }) {
  const [comments, setComments] = useState<LiveComment[]>([]);
  const [name, setName] = useState("");
  const [body, setBody] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchComments(post.id).then(setComments);
  }, [post.id]);

  const submit = async () => {
    if (body.trim().length < 2 || submitting) return;
    setSubmitting(true);
    const created = await addComment(post.id, name, body);
    setSubmitting(false);
    if (created) {
      setComments((prev) => [created, ...prev]);
      setBody("");
      toast.success("Comment posted.");
    } else {
      toast.error("Could not post comment — try again.");
    }
  };

  return (
    <section className="rounded-2xl bg-[#1E2235] p-5 text-white shadow-sm">
      <div className="mb-5">
        <span className="label-caps text-[#C4A09A]">Comments · Live</span>
        <h2 className="mt-1 text-2xl font-extrabold tracking-[-0.03em]">Conversation thread</h2>
      </div>
      <div className="mb-5 rounded-2xl border border-white/10 bg-black/15 p-4">
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Your name (optional)"
          className="mb-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-[#FF6B35] focus:outline-none"
        />
        <textarea
          value={body}
          onChange={(event) => setBody(event.target.value)}
          placeholder="Add to the conversation…"
          rows={3}
          className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-[#FF6B35] focus:outline-none"
        />
        <div className="mt-2 flex justify-end">
          <button
            onClick={submit}
            disabled={submitting || body.trim().length < 2}
            className="rounded-full bg-[#FF6B35] px-5 py-2 text-xs font-bold uppercase tracking-[0.08em] text-white disabled:opacity-40"
          >
            {submitting ? "Posting…" : "Post comment"}
          </button>
        </div>
      </div>
      {comments.length === 0 ? (
        <p className="rounded-2xl border border-white/10 bg-black/15 p-5 text-sm font-light text-white/60">No comments yet — start the thread.</p>
      ) : (
        <div className="space-y-3">
          {comments.map((comment) => (
            <article key={comment.id} className="rounded-2xl border border-white/10 bg-black/15 p-4">
              <div className="flex gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-[#FF6B35] to-[#CC0055] text-sm font-extrabold">
                  {comment.author_name.slice(0, 1).toUpperCase()}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-extrabold">{comment.author_name} <span className="font-light text-white/45">· {timeAgo(comment.created_at)}</span></h3>
                  <p className="mt-2 whitespace-pre-wrap text-sm font-light leading-relaxed text-white/78">{comment.body}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

function CreatorContext({ post }: { post: FeedPost }) {
  const nameBlock = post.authorSlug ? (
    <Link href={`/author/${post.authorSlug}`} className="hover:underline underline-offset-4">
      <h3 className="text-2xl font-extrabold tracking-[-0.03em] text-[#0A0A0F]">{post.creatorBio.name}</h3>
    </Link>
  ) : (
    <h3 className="text-2xl font-extrabold tracking-[-0.03em] text-[#0A0A0F]">{post.creatorBio.name}</h3>
  );
  return (
    <aside className="my-8 rounded-2xl border border-black/5 bg-[#F5F0EB] p-5">
      <span className="label-caps text-[#FF6B35]">{post.authorSlug ? "About the author" : "Creator context"}</span>
      <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-center">
        <span className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-[#1E2235]"><img src={(() => { const staff = getStaffAuthor(post.authorSlug); return staff ? authorAvatar(staff) : post.image; })()} alt={`${post.creatorBio.name} profile`} className="h-full w-full object-cover" /></span>
        <div className="min-w-0 flex-1">
          {nameBlock}
          <p className="text-sm font-light text-[#4A5278]">{post.creatorBio.handle} · {post.creatorBio.metric}</p>
          <div className="mt-3 flex flex-wrap gap-2 text-[10px] font-bold uppercase tracking-[0.1em] text-[#4A5278]">
            <span className="rounded-full bg-white px-3 py-1">{post.creatorBio.survey.culture}</span>
            <span className="rounded-full bg-white px-3 py-1">{post.creatorBio.survey.vibe}</span>
            <span className="rounded-full bg-white px-3 py-1">{post.creatorBio.survey.focus}</span>
          </div>
        </div>
      </div>
      {post.isAiAssisted && (
        <p className="mt-4 flex items-start gap-2 rounded-xl bg-white p-3 text-xs font-light leading-relaxed text-[#4A5278]">
          <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#FF6B35]" />
          {EDITORIAL_DISCLOSURE}
        </p>
      )}
    </aside>
  );
}

function Comments() {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({ "@JadeMelt": true });
  const [sort, setSort] = useState("Top");
  return (
    <section className="rounded-2xl bg-[#1E2235] p-5 text-white shadow-sm">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <span className="label-caps text-[#C4A09A]">Comments</span>
          <h2 className="mt-1 text-2xl font-extrabold tracking-[-0.03em]">Conversation thread</h2>
        </div>
        <div className="flex rounded-full bg-white/10 p-1">
          {["Top", "New"].map((item) => <button key={item} onClick={() => setSort(item)} className={`rounded-full px-3 py-1.5 text-xs font-bold ${sort === item ? "bg-white text-[#0A0A0F]" : "text-white/70"}`}>{item}</button>)}
        </div>
      </div>
      <div className="space-y-3">
        {comments.map((comment) => (
          <article key={comment.handle} className="rounded-2xl border border-white/10 bg-black/15 p-4">
            <div className="flex gap-3">
              <span className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-gradient-to-br from-[#FF6B35] to-[#CC0055]"><img src={`https://i.pravatar.cc/80?u=${encodeURIComponent(comment.handle)}`} alt={`${comment.handle} avatar`} className="h-full w-full object-cover" /></span>
              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-extrabold">{comment.handle} <span className="font-light text-white/45">· 24m ago</span></h3>
                <p className="mt-2 text-sm font-light leading-relaxed text-white/78">{comment.body}</p>
                <div className="mt-3 flex gap-3 text-xs font-semibold text-white/58">
                  <button onClick={() => toast.success("Comment liked.")} className="inline-flex items-center gap-1 hover:text-white"><Heart className="h-3.5 w-3.5" /> {comment.likes}</button>
                  <button onClick={() => toast("Reply composer opened.")} className="inline-flex items-center gap-1 hover:text-white"><Reply className="h-3.5 w-3.5" /> Reply</button>
                  {comment.replies.length > 0 && <button onClick={() => setExpanded((prev) => ({ ...prev, [comment.handle]: !prev[comment.handle] }))} className="hover:text-white">{expanded[comment.handle] ? "Hide" : "Show"} thread</button>}
                </div>
                {expanded[comment.handle] && comment.replies.length > 0 && (
                  <div className="mt-3 border-l border-[#FF6B35]/50 pl-3 text-sm font-light text-white/70">
                    {comment.replies.map((reply) => <p key={reply}>{reply}</p>)}
                  </div>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
      <button onClick={() => toast("Loading more comments…")} className="mt-4 w-full rounded-full border border-white/15 py-3 text-sm font-bold text-white/75 hover:bg-white hover:text-[#0A0A0F]">Load more comments</button>
    </section>
  );
}

function RelatedArticles({ currentId }: { currentId: string }) {
  const related = useMemo(() => feedPosts.filter((post) => post.id !== currentId).slice(0, 3), [currentId]);
  return (
    <section className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
      <span className="label-caps text-[#FF6B35]">Related Articles</span>
      <div className="mt-4 grid gap-3 md:grid-cols-3">
        {related.map((post) => (
          <Link key={post.id} href={`/article/${post.id}`}>
            <button className="overflow-hidden rounded-2xl border border-black/5 bg-[#F5F0EB] text-left transition-transform hover:-translate-y-1">
              <span className="mb-3 block h-24 overflow-hidden rounded-t-2xl bg-[#1E2235]"><img src={post.image} alt={post.imageAlt} className="h-full w-full object-cover" /></span>
              <strong className="block px-4 pb-4 text-sm leading-tight text-[#0A0A0F]">{post.title}</strong>
            </button>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default function ArticleDetail() {
  const [, params] = useRoute("/article/:id");
  const post = getFeedPost(params?.id);
  const isLivePost = Boolean(post.authorSlug);
  const [counts, setCounts] = useState<EngagementCounts>({ views: 0, like: 0, upvote: 0, share: 0, save: 0 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [post.id]);

  useEffect(() => {
    if (!isLivePost) return;
    let cancelled = false;
    incrementView(post.id).then(() =>
      fetchEngagement(post.id).then((fresh) => {
        if (!cancelled) setCounts(fresh);
      }),
    );
    return () => {
      cancelled = true;
    };
  }, [post.id, isLivePost]);

  const react = (kind: "like" | "upvote" | "share" | "save") => {
    setCounts((prev) => ({ ...prev, [kind]: prev[kind] + 1 }));
    void addReaction(post.id, kind);
  };

  return (
    <FeedShell active="article" railMode="article">
      <article className="mx-auto max-w-[680px] space-y-4">
        <Link href="/home" className="inline-flex items-center gap-2 text-sm font-bold text-[#4A5278] hover:text-[#0A0A0F]"><ArrowLeft className="h-4 w-4" /> Back to Feed</Link>
        <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm md:p-7">
          <header>
            <div className="mb-4 flex flex-wrap items-center gap-2 text-xs font-semibold text-[#4A5278]"><span className="rounded-full bg-[#F5F0EB] px-3 py-1 text-[#FF6B35]">{post.community}</span><span>{post.time}</span><span>·</span><span>@{post.author}</span>{post.sponsored && <span className="rounded-full bg-[#0A0A0F] px-3 py-1 text-white">Sponsored content</span>}</div>
            <h1 className="text-4xl font-extrabold leading-[0.98] tracking-[-0.055em] text-[#0A0A0F] md:text-6xl">{post.title}</h1>
            <p className="mt-5 text-xl font-light leading-relaxed text-[#4A5278]">{post.deck}</p>
            <ArticleTagRow post={post} />
          </header>
          <ArticleHeroImage post={post} />
          <div className="max-w-none">
            {post.body.map((block, index) => <ArticleBlock key={index} block={block} />)}
            {post.quote && <blockquote className="my-8 border-l-4 border-[#FF6B35] bg-[#F5F0EB] p-5 text-2xl font-light italic leading-snug text-[#1E2235]">{post.quote}</blockquote>}
            <p className="mb-6 text-[17px] font-light leading-[1.75] text-[#0A0A0F]"><Link href="/pavilion" className="font-semibold text-[#FF6B35] underline underline-offset-4">Open SPRK*Pavilion</Link> for brand-safe collaboration lanes, or <Link href="/os" className="font-semibold text-[#FF6B35] underline underline-offset-4">launch SPRK*OS</Link> to turn this story into clips, captions, briefs, and campaign assets.</p>
          </div>
          <ArticleSources post={post} />
          <CreatorContext post={post} />
          {isLivePost ? <LiveEngagement post={post} counts={counts} onReact={react} /> : <ArticleEngagement post={post} />}
        </div>

        <RelatedArticles currentId={post.id} />
        {isLivePost ? <LiveComments post={post} /> : <Comments />}
      </article>
    </FeedShell>
  );
}
