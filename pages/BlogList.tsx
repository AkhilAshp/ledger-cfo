import React, { useEffect, useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { Calendar, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { fetchBlogs, fetchAllBlogs } from "../api/blogApi";
import { Blog } from "../types/blog";
import ArchiveSidebar from "../pages/ArchiveSidebar";

/* ─── Pagination Component ──────────────────────────────────────── */

const Pagination: React.FC<{
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}> = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;

    const renderPageNumbers = () => {
        const pages: (number | string)[] = [];

        if (totalPages <= 5) {
            // If 5 or fewer pages, show all
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Calculate which set of 4 pages to show based on current page
            // Sets: 1-4, 5-8, 9-12, etc.
            const setNumber = Math.ceil(currentPage / 4);
            const startPage = (setNumber - 1) * 4 + 1;
            const endPage = Math.min(startPage + 3, totalPages);

            // Show current set of 4 pages
            for (let i = startPage; i <= endPage; i++) {
                pages.push(i);
            }

            // Add "..." and last page if we're not showing it
            if (endPage < totalPages) {
                pages.push("...");
                pages.push(totalPages);
            }
        }

        return pages.map((page, index) => {
            if (page === "...") {
                return (
                    <span
                        key={`ellipsis-${index}`}
                        className="w-10 h-10 flex items-center justify-center text-muted"
                    >
                        ...
                    </span>
                );
            }

            const pageNum = page as number;
            return (
                <button
                    key={pageNum}
                    onClick={() => onPageChange(pageNum)}
                    className={`w-10 h-10 rounded-md border transition-colors font-medium ${currentPage === pageNum
                        ? "bg-ink text-white border-ink"
                        : "border-black/10 hover:bg-black/5 text-ink"
                        }`}
                >
                    {pageNum}
                </button>
            );
        });
    };

    return (
        <div className="flex justify-center items-center gap-2">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-md border border-black/10 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-black/5 transition-colors"
                aria-label="Previous page"
            >
                <ChevronLeft size={20} />
            </button>

            {renderPageNumbers()}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-md border border-black/10 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-black/5 transition-colors"
                aria-label="Next page"
            >
                <ChevronRight size={20} />
            </button>
        </div>
    );
};

/* ─── Main Component ───────────────────────────────────────────── */

const BlogList: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const currentPage = parseInt(searchParams.get("page") || "1", 10);
    const monthFilter = searchParams.get("month") || null;

    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [allBlogs, setAllBlogs] = useState<Blog[]>([]); // For archives
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        window.scrollTo({ top: 0, behavior: "smooth" });

        // Fetch paginated blogs for display
        fetchBlogs(currentPage, 9)
            .then((response) => {
                setBlogs(response.data);
                setTotalPages(response.pagination.totalPages);
            })
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, [currentPage]);

    // Fetch all blogs for archives sidebar
    useEffect(() => {
        fetchAllBlogs()
            .then((data) => {
                // Map post_name to slug for ArchiveSidebar compatibility
                const blogsWithSlug = data.map(blog => ({
                    ...blog,
                    slug: blog.post_name
                }));
                setAllBlogs(blogsWithSlug);
            })
            .catch((err) => console.error("Failed to fetch all blogs for archives:", err));
    }, []);

    // Scroll to top when month filter changes
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [monthFilter]);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            const params: Record<string, string> = { page: page.toString() };
            if (monthFilter) params.month = monthFilter;
            setSearchParams(params);
        }
    };

    const handleMonthFilter = (key: string | null) => {
        const params: Record<string, string> = {};
        if (key) {
            params.month = key;
            params.page = "1"; // Reset to page 1 when filtering
        } else {
            params.page = currentPage.toString();
        }
        setSearchParams(params);
    };

    const handleBlogClick = (slug: string) => {
        navigate(`/blog/${slug}`);
    };

    // Filter blogs by month if a month filter is active
    const displayBlogs = monthFilter
        ? allBlogs.filter((blog) => {
            const date = new Date(blog.post_date);
            const blogMonth = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
            return blogMonth === monthFilter;
        })
        : blogs;

    if (loading) {
        return (
            <div className="min-h-screen bg-paper flex items-center justify-center">
                <p className="text-muted">Loading blogs...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-paper flex items-center justify-center">
                <p className="text-red-600 font-medium">{error}</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-paper py-20">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="font-serif text-5xl font-medium text-ink mb-4">
                        Blog
                    </h1>
                    <p className="text-lg text-muted max-w-2xl mx-auto">
                        Insights, updates, and stories from our team
                    </p>
                </div>

                {displayBlogs.length === 0 ? (
                    <p className="text-center text-muted">No blog posts yet.</p>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                        {/* Main content - Blog posts */}
                        <div className="lg:col-span-8">
                            <div className="grid md:grid-cols-2 gap-8 mb-16">
                                {displayBlogs.map((blog) => (
                                    <Link
                                        key={blog.ID}
                                        to={`/blog/${blog.post_name}`}
                                        className="group bg-white border border-black/10 rounded-sm hover:shadow-lg transition-all flex flex-col h-full"
                                    >
                                        <div className="p-6 flex flex-col h-full">
                                            <h2 className="font-serif text-2xl font-medium text-ink mb-3 line-clamp-2">
                                                {blog.post_title}
                                            </h2>

                                            <div className="flex items-center gap-2 text-sm text-muted mb-4">
                                                <Calendar size={14} />
                                                {new Date(blog.post_date).toLocaleDateString("en-US", {
                                                    month: "long",
                                                    day: "numeric",
                                                    year: "numeric",
                                                })}
                                            </div>

                                            {blog.post_excerpt && (
                                                <p className="text-muted text-sm mb-4 line-clamp-3 flex-grow">
                                                    {blog.post_excerpt}
                                                </p>
                                            )}

                                            <div className="flex items-center text-ink font-medium text-sm mt-auto pt-4">
                                                Read more <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>

                            {/* Pagination Controls - Only show when not filtering by month */}
                            {!monthFilter && (
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    onPageChange={handlePageChange}
                                />
                            )}
                        </div>

                        {/* Sidebar - Archives */}
                        <aside className="lg:col-span-4">
                            <div className="sticky top-28">
                                <ArchiveSidebar
                                    blogs={allBlogs}
                                    onBlogClick={handleBlogClick}
                                    onMonthFilter={handleMonthFilter}
                                    activeMonth={monthFilter}
                                />
                            </div>
                        </aside>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BlogList;