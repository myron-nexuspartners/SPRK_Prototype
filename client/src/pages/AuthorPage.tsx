import { Link, useRoute } from "wouter";
import { ArrowLeft, PenLine, Sparkles } from "lucide-react";
import FeedShell from "@/components/FeedShell";
import { authorAvatar, getStaffAuthor, staffAuthors, EDITORIAL_DISCLOSURE } from "@/data/authors";
import { getPostsByAuthor, type FeedPost } from "@/data/feedContent";

function AuthorArticleCard({ post }: { post: FeedPost }) {
  return (
    <Link href={`/article/${post.id}`}>
      <button className="w-full overflow-hidden rounded-2xl border border-black/5 bg-white text-left shadow-sm transition-transform hover:-translate-y-1">
        <div className="relative aspect-video overflow-hidden bg-[#1E2235]">
          <img src={post.image} alt={post.imageAlt} className="h-full w-full object-cover" />
          <div className="absolute left-3 top-3 flex gap-2">
            <span className="rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.1em] text-[#0A0A0F]">{post.contentType}</span>
          </div>
        </div>
        <div className="p-4">
          <div className="mb-2 text-xs font-semibold text-[#8E7A8A]">{post.community} · {post.time}</div>
          <h2 className="text-lg font-extrabold leading-tight tracking-[-0.03em] text-[#0A0A0F]">{post.title}</h2>
          <p className="mt-2 line-clamp-2 text-sm font-light leading-relaxed text-[#4A5278]">{post.deck}</p>
        </div>
      </button>
    </Link>
  );
}

export default function AuthorPage() {
  const [, params] = useRoute("/author/:slug");
  const author = getStaffAuthor(params?.slug);

  if (!author) {
    return (
      <FeedShell active="article" railMode="article">
        <div className="mx-auto max-w-[680px] rounded-2xl border border-black/5 bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-extrabold tracking-[-0.03em] text-[#0A0A0F]">Contributor not found</h1>
          <p className="mt-3 text-sm font-light text-[#4A5278]">This contributor page does not exist yet.</p>
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {staffAuthors.map((staff) => (
              <Link key={staff.slug} href={`/author/${staff.slug}`}>
                <button className="rounded-full bg-[#F5F0EB] px-4 py-2 text-xs font-bold text-[#0A0A0F] hover:bg-[#0A0A0F] hover:text-white">{staff.name}</button>
              </Link>
            ))}
          </div>
        </div>
      </FeedShell>
    );
  }

  const posts = getPostsByAuthor(author.slug);

  return (
    <FeedShell active="article" railMode="article">
      <div className="mx-auto max-w-[720px] space-y-4">
        <Link href="/home" className="inline-flex items-center gap-2 text-sm font-bold text-[#4A5278] hover:text-[#0A0A0F]"><ArrowLeft className="h-4 w-4" /> Back to Feed</Link>

        <header className="overflow-hidden rounded-2xl border border-black/5 bg-white shadow-sm">
          <div className="h-24 bg-gradient-to-r from-[#FF6B35] via-[#E8003D] to-[#CC0055]" />
          <div className="p-6 md:p-7">
            <div className="-mt-16 mb-4 flex items-end gap-4">
              <span className="h-24 w-24 shrink-0 overflow-hidden rounded-2xl border-4 border-white bg-[#1E2235] shadow-md">
                <img src={authorAvatar(author)} alt={`${author.name} portrait`} className="h-full w-full object-cover" />
              </span>
              <span className="mb-1 inline-flex items-center gap-1.5 rounded-full bg-[#F5F0EB] px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#FF6B35]"><PenLine className="h-3 w-3" /> SPRK Studio Contributor</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-[-0.04em] text-[#0A0A0F] md:text-4xl">{author.name}</h1>
            <p className="mt-1 text-sm font-semibold text-[#8E7A8A]">{author.handle} · {author.title}</p>
            <p className="mt-4 max-w-[60ch] text-[15px] font-light leading-relaxed text-[#4A5278]">{author.bio}</p>
            <div className="mt-4 flex flex-wrap gap-2 text-[10px] font-bold uppercase tracking-[0.1em] text-[#4A5278]">
              <span className="rounded-full bg-[#F5F0EB] px-3 py-1">{author.chips.culture}</span>
              <span className="rounded-full bg-[#F5F0EB] px-3 py-1">{author.chips.vibe}</span>
              <span className="rounded-full bg-[#F5F0EB] px-3 py-1">{author.chips.focus}</span>
            </div>
            <p className="mt-5 flex items-start gap-2 rounded-xl bg-[#F5F0EB] p-3 text-xs font-light leading-relaxed text-[#4A5278]">
              <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#FF6B35]" />
              {EDITORIAL_DISCLOSURE}
            </p>
          </div>
        </header>

        <section>
          <div className="mb-3 flex items-baseline justify-between">
            <h2 className="text-xl font-extrabold tracking-[-0.03em] text-[#0A0A0F]">Articles by {author.name.split(" ")[0]}</h2>
            <span className="text-xs font-semibold text-[#8E7A8A]">{posts.length} published</span>
          </div>
          {posts.length === 0 ? (
            <div className="rounded-2xl border border-black/5 bg-white p-8 text-center text-sm font-light text-[#4A5278] shadow-sm">First piece is in the works — check back soon.</div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {posts.map((post) => <AuthorArticleCard key={post.id} post={post} />)}
            </div>
          )}
        </section>
      </div>
    </FeedShell>
  );
}
