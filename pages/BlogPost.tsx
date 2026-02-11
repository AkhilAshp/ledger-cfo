import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Calendar, ArrowLeft, Clock, Share2, Linkedin, Twitter, Link as LinkIcon } from "lucide-react";
import { fetchBlog } from "../api/blogApi";
import { Blog } from "../types/blog";

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

    if (loading) {
        return (
            <div className="min-h-screen bg-paper flex items-center justify-center">
                <p className="text-muted">Loading blog post...</p>
            </div>
        );
    }

    if (error || !blog) {
        return (
            <div className="min-h-screen bg-paper flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600 font-medium mb-4">
                        {error || "Blog post not found"}
                    </p>
                    <Link to="/blog" className="inline-flex items-center gap-2 text-ink hover:text-ink/70 transition-colors">
                        <ArrowLeft size={16} />
                        Back to Blog
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-paper pt-32 pb-20">
            {/* Header Section */}
            <div className="max-w-4xl mx-auto px-6 lg:px-8 mb-16 text-center">
                <Link
                    to="/blog"
                    className="inline-flex items-center gap-2 text-muted hover:text-ink mb-8 transition-colors text-sm font-medium"
                >
                    <ArrowLeft size={16} />
                    Back to Blog
                </Link>

                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium text-ink mb-6 leading-[1.1]">
                    {blog.post_title}
                </h1>

                <div className="flex items-center justify-center gap-6 text-muted text-sm border-t border-black/5 pt-6 mt-8 inline-flex mx-auto w-full max-w-lg">
                    <div className="flex items-center gap-2">
                        <Calendar size={14} />
                        {new Date(blog.post_date).toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                            year: "numeric",
                        })}
                    </div>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Main Content */}
                    <article className="lg:col-span-8">
                        <div
                            className="prose prose-lg prose-slate max-w-none text-ink/90 prose-headings:font-sans-strong prose-headings:text-ink prose-a:text-ink prose-a:underline hover:prose-a:text-ink/80 prose-img:rounded-sm"
                            dangerouslySetInnerHTML={{ __html: blog.post_content || "" }}
                        />

                        {/* Bottom CTA */}
                        <div className="mt-16 bg-white border border-black/5 p-8 md:p-12 rounded-sm text-center">
                            <h3 className="font-serif text-3xl text-ink mb-4">
                                Ready to scale your finance operations?
                            </h3>
                            <p className="text-muted mb-8 max-w-xl mx-auto">
                                Join hundreds of startups that trust LedgersCFO with their accounting, taxes, and financial strategy.
                            </p>
                            <a
                                href="https://cal.com/ledgerscfo/intro"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center h-12 px-8 bg-ink text-white font-medium rounded-full hover:bg-ink/90 transition-colors"
                            >
                                Book a Free CFO Call
                            </a>
                        </div>
                    </article>

                    {/* Sidebar */}
                    <aside className="lg:col-span-4 space-y-8">
                        {/* Sticky Container */}
                        <div className="sticky top-32 space-y-8">
                            {/* CTA Card */}
                            <div className="bg-ink text-white p-8 rounded-sm">
                                <h3 className="font-serif text-2xl mb-4">
                                    Need help with US Tax Filing?
                                </h3>
                                <p className="text-white/80 mb-6 text-sm leading-relaxed">
                                    Don't let compliance hold you back. Our experts are ready to handle your filings efficiently.
                                </p>
                                <a
                                    href="https://cal.com/ledgerscfo/intro"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block w-full text-center py-3 bg-white text-ink font-medium rounded hover:bg-white/90 transition-colors"
                                >
                                    Talk to an Expert
                                </a>
                            </div>

                            {/* Share Links (Visual only for now) */}
                            <div className="bg-white border border-black/5 p-6 rounded-sm">
                                <h4 className="font-medium text-ink mb-4 flex items-center gap-2">
                                    <Share2 size={16} /> Share this article
                                </h4>
                                <div className="flex gap-2">
                                    <button className="p-2 text-muted hover:text-[#0077b5] hover:bg-[#0077b5]/5 rounded transition-colors" aria-label="Share on LinkedIn">
                                        <Linkedin size={20} />
                                    </button>
                                    <button className="p-2 text-muted hover:text-black hover:bg-black/5 rounded transition-colors" aria-label="Share on X">
                                        <Twitter size={20} />
                                    </button>
                                    <button
                                        className="p-2 text-muted hover:text-ink hover:bg-black/5 rounded transition-colors"
                                        aria-label="Copy Link"
                                        onClick={() => {
                                            navigator.clipboard.writeText(window.location.href);
                                            // You could add a toast here
                                        }}
                                    >
                                        <LinkIcon size={20} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default BlogPost;
