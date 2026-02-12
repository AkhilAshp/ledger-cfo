import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
    Calendar,
    ArrowLeft,
    Share2,
    Linkedin,
    Twitter,
    Link as LinkIcon,
    Clock,
    CheckCheck,
    ChevronUp,
    BookOpen,
} from "lucide-react";
import { fetchBlog } from "../api/blogApi";
import { Blog } from "../types/blog";

/* ─── Helpers ──────────────────────────────────────────────────── */

function estimateReadTime(html: string): number {
    const text = html.replace(/<[^>]*>/g, " ");
    const words = text.trim().split(/\s+/).length;
    return Math.max(1, Math.round(words / 200));
}

interface Heading {
    id: string;
    text: string;
    level: number; // 2 = main section, 3 = sub-section
}

function extractHeadings(html: string): Heading[] {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    return Array.from(doc.querySelectorAll("h2, h3")).map((node, idx) => {
        const text = node.textContent ?? "";
        const id =
            node.id ||
            text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") ||
            `heading-${idx}`;
        return { id, text, level: parseInt(node.tagName[1]) };
    });
}

function injectHeadingIds(html: string): string {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    doc.querySelectorAll("h2, h3").forEach((node, idx) => {
        if (!node.id) {
            const text = node.textContent ?? "";
            node.id =
                text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") ||
                `heading-${idx}`;
        }
    });
    return doc.body.innerHTML;
}

/* ─── Reading Progress Bar ─────────────────────────────────────── */

const ReadingProgress: React.FC = () => {
    const [progress, setProgress] = useState(0);
    useEffect(() => {
        const onScroll = () => {
            const el = document.documentElement;
            const total = el.scrollHeight - el.clientHeight;
            setProgress(total > 0 ? Math.min(100, (el.scrollTop / total) * 100) : 0);
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);
    return (
        <div className="fixed top-0 left-0 right-0 h-[3px] z-50 bg-black/5">
            <div
                className="h-full bg-ink transition-[width] duration-100 ease-linear"
                style={{ width: `${progress}%` }}
            />
        </div>
    );
};

/* ─── Back to Top ──────────────────────────────────────────────── */

const BackToTop: React.FC = () => {
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > 600);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);
    return (
        <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className={`fixed bottom-8 right-8 z-40 w-10 h-10 flex items-center justify-center rounded-full bg-ink text-white shadow-lg transition-all duration-300 hover:bg-ink/80 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
                }`}
        >
            <ChevronUp size={18} />
        </button>
    );
};

/* ─── Table of Contents ────────────────────────────────────────── */
/*
   Simplified ToC:
   – All headings in italic, no bold, no indentation
   – Active item gets a solid left accent line
*/

const TableOfContents: React.FC<{ headings: Heading[] }> = ({ headings }) => {
    const [activeId, setActiveId] = useState<string>("");

    useEffect(() => {
        if (!headings.length) return;
        const observer = new IntersectionObserver(
            (entries) => {
                const hit = entries.find((e) => e.isIntersecting);
                if (hit) setActiveId(hit.target.id);
            },
            { rootMargin: "0px 0px -55% 0px", threshold: 0 }
        );
        headings.forEach(({ id }) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, [headings]);

    if (headings.length < 2) return null;

    return (
        <nav aria-label="Table of contents" className="bg-white border border-black/5 rounded-sm overflow-hidden">
            {/* ── Card header ── */}
            <div className="px-5 pt-4 pb-3 border-b border-black/5 flex items-center gap-2">
                <BookOpen size={12} className="text-muted shrink-0" />
                <span className="text-[10px] font-semibold tracking-[0.16em] uppercase text-muted">
                    In this article
                </span>
            </div>

            {/* ── Links ── */}
            <ul className="py-2" role="list">
                {headings.map(({ id, text }) => {
                    const isActive = activeId === id;

                    return (
                        <li key={id}>
                            <a
                                href={`#${id}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    document
                                        .getElementById(id)
                                        ?.scrollIntoView({ behavior: "smooth", block: "start" });
                                }}
                                className={[
                                    "flex items-start gap-0 px-5 py-[7px] text-sm leading-snug transition-colors duration-150 border-l-2",
                                    "italic font-normal",
                                    /* active state */
                                    isActive
                                        ? "border-ink text-ink"
                                        : "border-transparent text-muted hover:text-ink hover:border-ink/25",
                                ].join(" ")}
                            >
                                {text}
                            </a>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

/* ─── Share Bar ────────────────────────────────────────────────── */

const ShareBar: React.FC<{ title: string }> = ({ title }) => {
    const [copied, setCopied] = useState(false);
    const url = typeof window !== "undefined" ? window.location.href : "";

    const copyLink = async () => {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-white border border-black/5 rounded-sm overflow-hidden">
            {/* Card header */}
            <div className="px-5 pt-4 pb-3 border-b border-black/5 flex items-center gap-2">
                <Share2 size={12} className="text-muted shrink-0" />
                <span className="text-[10px] font-semibold tracking-[0.16em] uppercase text-muted">
                    Share this article
                </span>
            </div>

            {/* Buttons */}
            <div className="px-5 py-4 flex items-center gap-1">
                <button
                    onClick={() =>
                        window.open(
                            `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
                            "_blank"
                        )
                    }
                    className="p-2 text-muted hover:text-[#0077b5] hover:bg-[#0077b5]/5 rounded transition-colors"
                    aria-label="Share on LinkedIn"
                >
                    <Linkedin size={19} />
                </button>
                <button
                    onClick={() =>
                        window.open(
                            `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
                            "_blank"
                        )
                    }
                    className="p-2 text-muted hover:text-black hover:bg-black/5 rounded transition-colors"
                    aria-label="Share on X / Twitter"
                >
                    <Twitter size={19} />
                </button>
                <button
                    onClick={copyLink}
                    className="p-2 text-muted hover:text-ink hover:bg-black/5 rounded transition-colors"
                    aria-label="Copy link"
                >
                    {copied ? (
                        <CheckCheck size={19} className="text-green-600" />
                    ) : (
                        <LinkIcon size={19} />
                    )}
                </button>
                {copied && (
                    <span className="text-xs text-green-600 font-medium ml-1">Copied!</span>
                )}
            </div>
        </div>
    );
};

/* ─── Main Component ───────────────────────────────────────────── */

const BlogPost: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const [blog, setBlog] = useState<Blog | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!slug) return;
        setLoading(true);
        fetchBlog(slug)
            .then((data) => setBlog(data))
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, [slug]);

    /* Loading */
    if (loading) {
        return (
            <div className="min-h-screen bg-paper flex items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-56 h-3 bg-black/8 rounded-full animate-pulse" />
                    <div className="w-40 h-3 bg-black/5 rounded-full animate-pulse" />
                    <p className="text-muted text-sm mt-2">Loading article…</p>
                </div>
            </div>
        );
    }

    /* Error */
    if (error || !blog) {
        return (
            <div className="min-h-screen bg-paper flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600 font-medium mb-4">{error || "Blog post not found"}</p>
                    <Link
                        to="/blog"
                        className="inline-flex items-center gap-2 text-ink hover:text-ink/70 transition-colors"
                    >
                        <ArrowLeft size={16} />
                        Back to Blog
                    </Link>
                </div>
            </div>
        );
    }

    const readTime = estimateReadTime(blog.post_content || "");
    const headings = extractHeadings(blog.post_content || "");
    const processedContent = injectHeadingIds(blog.post_content || "");
    const formattedDate = new Date(blog.post_date).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });

    // Transform "Book a free consultation now" into a button
    let contentWithButton = processedContent;

    // Case 1: Try to inject class into existing link with this text
    if (contentWithButton.includes('>Book a free consultation now</a>')) {
        contentWithButton = contentWithButton.replace(
            /<a([^>]+)>Book a free consultation now<\/a>/g,
            '<a$1 class="inline-block bg-ink !text-white font-medium px-8 py-3 rounded-full hover:bg-ink/90 transition-all !no-underline mt-4 mb-8">Book a free consultation now</a>'
        );
    } else {
        // Case 2: Just text, wrap it
        contentWithButton = contentWithButton.replace(
            /Book a free consultation now/g,
            '<a href="https://cal.com/ayush-garg-ledger/discovery-call" target="_blank" rel="noopener noreferrer" class="inline-block bg-ink !text-white font-medium px-8 py-3 rounded-full hover:bg-ink/90 transition-all !no-underline mt-4 mb-8">Book a free consultation now</a>'
        );
    }

    return (
        <>
            <ReadingProgress />
            <BackToTop />

            <div className="min-h-screen bg-paper pt-28 pb-28">

                {/* ── Article Header ────────────────────────────────── */}
                <header className="max-w-3xl mx-auto px-6 lg:px-8 mb-16 text-center">
                    <Link
                        to="/blog"
                        className="inline-flex items-center gap-1.5 text-muted hover:text-ink mb-10 transition-colors text-sm font-medium group"
                    >
                        <ArrowLeft
                            size={14}
                            className="transition-transform duration-150 group-hover:-translate-x-0.5"
                        />
                        Back to Blog
                    </Link>

                    {/* Title */}
                    <h1 className="font-serif text-4xl md:text-5xl lg:text-[3.25rem] font-medium text-ink mb-8 leading-[1.1] tracking-tight">
                        {blog.post_title}
                    </h1>

                    {/* Meta */}
                    <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-muted text-sm">
                        <span className="flex items-center gap-1.5">
                            <Calendar size={13} />
                            {formattedDate}
                        </span>
                        <span className="w-px h-3 bg-black/15 hidden sm:block" aria-hidden />
                        <span className="flex items-center gap-1.5">
                            <Clock size={13} />
                            {readTime} min read
                        </span>
                    </div>

                    <div className="mt-10 h-px w-24 bg-black/10 mx-auto" />
                </header>

                {/* ── Body ──────────────────────────────────────────── */}
                <div className="max-w-6xl mx-auto px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 xl:gap-20">

                        {/* ── Article ─────────────────────────────────── */}
                        <article className="lg:col-span-8 min-w-0">

                            {/* Mobile share row */}
                            <div className="flex items-center gap-2 mb-10 lg:hidden">
                                <span className="text-xs text-muted font-semibold uppercase tracking-widest mr-1">Share</span>
                                <button
                                    onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, "_blank")}
                                    className="p-1.5 text-muted hover:text-[#0077b5] transition-colors"
                                    aria-label="LinkedIn"
                                ><Linkedin size={17} /></button>
                                <button
                                    onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(blog.post_title)}&url=${encodeURIComponent(window.location.href)}`, "_blank")}
                                    className="p-1.5 text-muted hover:text-black transition-colors"
                                    aria-label="Twitter / X"
                                ><Twitter size={17} /></button>
                            </div>

                            {/*
                                ── Prose styles ──
                                Goals:
                                · Generous line-height + paragraph spacing → spacious
                                · Body text is ink/85, NOT bold by default
                                · h2 = clear section break, larger, separated
                                · h3 = sub-section, smaller, no heavy border
                                · strong = slightly heavier but not screaming
                                · No over-use of bold anywhere
                            */}
                            <div
                                className={[
                                    /* base */
                                    "prose max-w-none",
                                    /* body */
                                    "text-[1.0625rem] leading-[1.9] text-ink/85",
                                    /* paragraphs — breathe */
                                    "[&>p]:mb-7 [&>p]:leading-[1.9]",
                                    /* H2 — main section heading: bold + clear separation */
                                    "[&_h2]:font-serif [&_h2]:text-[1.6rem] [&_h2]:font-semibold [&_h2]:tracking-tight",
                                    "[&_h2]:text-ink [&_h2]:mt-14 [&_h2]:mb-5",
                                    "[&_h2]:pb-3 [&_h2]:border-b [&_h2]:border-black/8",
                                    /* H3 — sub-section: normal weight, italic, smaller */
                                    "[&_h3]:font-sans [&_h3]:text-[1.1rem] [&_h3]:font-medium [&_h3]:italic",
                                    "[&_h3]:text-ink/80 [&_h3]:mt-9 [&_h3]:mb-3",
                                    /* H4 */
                                    "[&_h4]:font-sans [&_h4]:text-base [&_h4]:font-semibold",
                                    "[&_h4]:text-ink [&_h4]:mt-7 [&_h4]:mb-2",
                                    /* strong — only slightly heavier, never distracting */
                                    "[&_strong]:font-semibold [&_strong]:text-ink",
                                    /* links */
                                    "[&_a]:text-ink [&_a]:underline [&_a]:underline-offset-2",
                                    "hover:[&_a]:text-ink/65 [&_a]:transition-colors",
                                    /* blockquote */
                                    "[&_blockquote]:not-italic [&_blockquote]:border-l-[3px] [&_blockquote]:border-ink/20",
                                    "[&_blockquote]:bg-white [&_blockquote]:pl-6 [&_blockquote]:pr-5",
                                    "[&_blockquote]:py-4 [&_blockquote]:my-8 [&_blockquote]:rounded-r-sm",
                                    "[&_blockquote]:text-ink/70 [&_blockquote]:text-base [&_blockquote]:leading-[1.8]",
                                    /* lists — generous spacing */
                                    "[&_ul]:my-6 [&_ul]:pl-6 [&_ul>li]:mb-2.5 [&_ul>li]:leading-[1.8]",
                                    "[&_ol]:my-6 [&_ol]:pl-6 [&_ol>li]:mb-2.5 [&_ol>li]:leading-[1.8]",
                                    /* list marker */
                                    "[&_ul>li]:list-disc [&_ol>li]:list-decimal",
                                    /* images */
                                    "[&_img]:rounded-sm [&_img]:shadow-sm [&_img]:my-8",
                                    /* code inline */
                                    "[&_code]:bg-black/5 [&_code]:px-1.5 [&_code]:py-0.5",
                                    "[&_code]:rounded [&_code]:text-[0.875em] [&_code]:font-normal",
                                    /* code block */
                                    "[&_pre]:bg-ink [&_pre]:text-white/90 [&_pre]:rounded-sm",
                                    "[&_pre]:text-sm [&_pre]:leading-relaxed [&_pre]:p-5 [&_pre]:my-8",
                                    /* hr */
                                    "[&_hr]:border-black/8 [&_hr]:my-12",
                                    /* table */
                                    "[&_table]:w-full [&_table]:text-sm [&_table]:border-collapse",
                                    "[&_th]:text-left [&_th]:font-semibold [&_th]:text-ink",
                                    "[&_th]:py-2.5 [&_th]:px-3 [&_th]:border-b [&_th]:border-black/10",
                                    "[&_td]:py-2.5 [&_td]:px-3 [&_td]:border-b [&_td]:border-black/5",
                                    "[&_td]:text-ink/80 [&_td]:leading-relaxed",
                                ].join(" ")}
                                dangerouslySetInnerHTML={{ __html: contentWithButton }}
                            />

                            {/* Article footer row */}
                            <div className="mt-16 pt-7 border-t border-black/8 flex items-center justify-between flex-wrap gap-4">
                                <Link
                                    to="/blog"
                                    className="inline-flex items-center gap-2 text-muted hover:text-ink transition-colors text-sm font-medium group"
                                >
                                    <ArrowLeft size={14} className="transition-transform duration-150 group-hover:-translate-x-0.5" />
                                    All Articles
                                </Link>
                                <span className="flex items-center gap-1.5 text-sm text-muted">
                                    <Clock size={13} />
                                    {readTime} min read
                                </span>
                            </div>

                            {/* Bottom CTA */}
                            <div className="mt-12 bg-white border border-black/5 p-10 md:p-14 rounded-sm text-center relative overflow-hidden">
                                <div aria-hidden className="pointer-events-none absolute -top-16 -right-16 w-48 h-48 rounded-full border border-black/5" />
                                <div aria-hidden className="pointer-events-none absolute -bottom-12 -left-12 w-36 h-36 rounded-full border border-black/5" />
                                <h3 className="font-serif text-[1.9rem] text-ink mb-4 font-medium relative leading-snug">
                                    Ready to scale your finance operations?
                                </h3>
                                <p className="text-muted mb-8 max-w-md mx-auto leading-relaxed text-[0.95rem] relative">
                                    Join hundreds of startups that trust LedgersCFO with their
                                    accounting, taxes, and financial strategy.
                                </p>
                                <a
                                    href="https://cal.com/ayush-garg-ledger/discovery-call"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center h-12 px-10 bg-ink text-white font-medium rounded-full hover:bg-ink/90 transition-colors relative"
                                >
                                    Book a Free CFO Call
                                </a>
                            </div>
                        </article>

                        {/* ── Sidebar ─────────────────────────────────── */}
                        <aside className="lg:col-span-4 space-y-5">
                            <div className="sticky top-28 space-y-5">

                                {/* ── CTA Card ── */}
                                <div className="bg-ink text-white rounded-sm overflow-hidden relative">
                                    <div aria-hidden className="pointer-events-none absolute -top-10 -right-10 w-36 h-36 rounded-full border border-white/10" />

                                    <div className="px-6 pt-6 pb-0 relative">
                                        {/* Eyebrow label — small, muted */}
                                        <span className="block text-[10px] font-semibold tracking-[0.16em] uppercase text-white/40 mb-2">
                                            Expert Help
                                        </span>
                                        {/* Main heading — prominent */}
                                        <h3 className="font-serif text-[1.35rem] leading-snug font-medium text-white">
                                            Need help with US Tax Filing?
                                        </h3>
                                    </div>

                                    <div className="mx-6 mt-4 mb-4 h-px bg-white/10" />

                                    <div className="px-6 pb-6 relative">
                                        {/* Body copy — clearly lighter than heading */}
                                        <p className="text-white/60 text-[0.8rem] leading-[1.75] mb-5">
                                            Don't let compliance hold you back. Our experts handle
                                            US filings end-to-end — accurately and on time.
                                        </p>
                                        <a
                                            href="https://cal.com/ayush-garg-ledger/discovery-call"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block w-full text-center py-2.5 bg-white text-ink text-sm font-semibold rounded hover:bg-white/90 transition-colors"
                                        >
                                            Talk to an Expert →
                                        </a>
                                    </div>
                                </div>

                                {/* ── Table of Contents ── */}
                                <TableOfContents headings={headings} />

                                {/* ── Share ── */}
                                <ShareBar title={blog.post_title} />

                                {/* ── Reading Info ── */}
                                <div className="bg-white border border-black/5 rounded-sm overflow-hidden">
                                    <div className="px-5 pt-4 pb-3 border-b border-black/5 flex items-center gap-2">
                                        <Clock size={12} className="text-muted shrink-0" />
                                        <span className="text-[10px] font-semibold tracking-[0.16em] uppercase text-muted">
                                            Reading Info
                                        </span>
                                    </div>
                                    <div className="divide-y divide-black/5">
                                        <div className="px-5 py-3 flex items-center justify-between">
                                            {/* label — normal weight */}
                                            <span className="text-xs text-muted">Est. read time</span>
                                            {/* value — slightly bolder */}
                                            <span className="text-sm font-semibold text-ink">{readTime} min</span>
                                        </div>
                                        <div className="px-5 py-3 flex items-center justify-between">
                                            <span className="text-xs text-muted">Published</span>
                                            <span className="text-xs font-medium text-ink">{formattedDate}</span>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </aside>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BlogPost;