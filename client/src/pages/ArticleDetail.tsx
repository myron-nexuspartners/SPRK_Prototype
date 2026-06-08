import React, { useMemo, useState } from "react";
import { Link, useRoute } from "wouter";
import { ArrowLeft, Bookmark, Heart, MessageCircle, Reply, Share2, Sparkles } from "lucide-react";
import { toast } from "sonner";
import FeedShell from "@/components/FeedShell";
import { feedPosts, getFeedPost, type FeedPost } from "@/data/feedContent";

const comments = [
  { handle: "@JadeMelt", body: "Great article. The context makes the post feel like a real community scene, not just another feed hit.", likes: 45, replies: ["@DropSignal: Exactly. The lore is the launch."] },
  { handle: "@MockUpMars", body: "The article treatment is clean. I would love a creator map next.", likes: 31, replies: [] },
  { handle: "@PavilionBacker", body: "This is why rights and rev-share clarity matter before hype hits scale.", likes: 24, replies: ["@SPRKDesk: Pavilion context is coming in the next brief."] },
];

function ArticleHeroImage({ post }: { post: FeedPost }) {
  return (
    <div className="relative my-6 flex min-h-[310px] items-end overflow-hidden rounded-2xl bg-[#1E2235] text-white md:min-h-[390px]">
      <img src={post.image} alt={post.imageAlt} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0F]/86 via-[#0A0A0F]/38 to-[#FF6B35]/18" />
      <div className="absolute right-8 top-8 flex h-24 w-24 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white/85 backdrop-blur-sm"><Sparkles className="h-12 w-12" /></div>
      <div className="relative z-10 max-w-xl p-6 md:p-8">
        <span className="label-caps text-[#C4A09A]">{post.contentType} · {post.category}</span>
        <h2 className="mt-2 text-4xl font-extrabold uppercase leading-[0.92] tracking-[-0.05em] md:text-6xl">{post.title.split(":")[0]}</h2>
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

function CreatorContext({ post }: { post: FeedPost }) {
  return (
    <aside className="my-8 rounded-2xl border border-black/5 bg-[#F5F0EB] p-5">
      <span className="label-caps text-[#FF6B35]">Creator context</span>
      <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-center">
        <span className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-[#1E2235]"><img src={post.image} alt="Creator profile context" className="h-full w-full object-cover" /></span>
        <div className="min-w-0 flex-1">
          <h3 className="text-2xl font-extrabold tracking-[-0.03em] text-[#0A0A0F]">{post.creatorBio.name}</h3>
          <p className="text-sm font-light text-[#4A5278]">{post.creatorBio.handle} · {post.creatorBio.metric}</p>
          <div className="mt-3 flex flex-wrap gap-2 text-[10px] font-bold uppercase tracking-[0.1em] text-[#4A5278]">
            <span className="rounded-full bg-white px-3 py-1">{post.creatorBio.survey.culture}</span>
            <span className="rounded-full bg-white px-3 py-1">{post.creatorBio.survey.vibe}</span>
            <span className="rounded-full bg-white px-3 py-1">{post.creatorBio.survey.focus}</span>
          </div>
        </div>
      </div>
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

  return (
    <FeedShell active="article" railMode="article">
      <article className="mx-auto max-w-[680px] space-y-4">
        <Link href="/home" className="inline-flex items-center gap-2 text-sm font-bold text-[#4A5278] hover:text-[#0A0A0F]"><ArrowLeft className="h-4 w-4" /> Back to Feed</Link>
        <div className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm md:p-7">
          <header>
            <div className="mb-4 flex flex-wrap items-center gap-2 text-xs font-semibold text-[#4A5278]"><span className="rounded-full bg-[#F5F0EB] px-3 py-1 text-[#FF6B35]">{post.community}</span><span>{post.time}</span><span>·</span><span>@{post.author}</span>{post.sponsored && <span className="rounded-full bg-[#0A0A0F] px-3 py-1 text-white">Sponsored content</span>}</div>
            <h1 className="text-4xl font-extrabold leading-[0.98] tracking-[-0.055em] text-[#0A0A0F] md:text-6xl">{post.title}</h1>
            <p className="mt-5 text-xl font-light leading-relaxed text-[#4A5278]">{post.deck}</p>
          </header>
          <ArticleHeroImage post={post} />
          <div className="prose prose-lg max-w-none prose-p:my-6 prose-p:text-[17px] prose-p:font-light prose-p:leading-[1.75] prose-p:text-[#0A0A0F] prose-a:font-semibold prose-a:text-[#FF6B35] prose-strong:text-[#0A0A0F]">
            {post.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {post.quote && <blockquote className="my-8 border-l-4 border-[#FF6B35] bg-[#F5F0EB] p-5 text-2xl font-light italic leading-snug text-[#1E2235]">{post.quote}</blockquote>}
            <p><Link href="/pavilion" className="font-semibold text-[#FF6B35] underline underline-offset-4">Open SPRK*Pavilion</Link> for brand-safe collaboration lanes, or <Link href="/os" className="font-semibold text-[#FF6B35] underline underline-offset-4">launch SPRK*OS</Link> to turn this story into clips, captions, briefs, and campaign assets.</p>
          </div>
          <CreatorContext post={post} />
          <ArticleEngagement post={post} />
        </div>

        <RelatedArticles currentId={post.id} />
        <Comments />
      </article>
    </FeedShell>
  );
}
