import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Calendar, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { fetchBlogs } from "../api/blogApi";
import { Blog } from "../types/blog";

const BlogList: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = parseInt(searchParams.get("page") || "1", 10);

    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        window.scrollTo({ top: 0, behavior: "smooth" });

        // Fetch 9 items per page as requested
        fetchBlogs(currentPage, 9)
            .then((response) => {
                setBlogs(response.data);
                setTotalPages(response.pagination.totalPages);
            })
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, [currentPage]);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setSearchParams({ page: page.toString() });
        }
    };

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
            <div className="max-w-6xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h1 className="font-serif text-5xl font-medium text-ink mb-4">
                        Blog
                    </h1>
                    <p className="text-lg text-muted max-w-2xl mx-auto">
                        Insights, updates, and stories from our team
                    </p>
                </div>

                {blogs.length === 0 ? (
                    <p className="text-center text-muted">No blog posts yet.</p>
                ) : (
                    <>
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                            {blogs.map((blog) => (
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
                                            {new Date(blog.post_date).toLocaleDateString()}
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

                        {/* Pagination Controls */}
                        {totalPages > 1 && (
                            <div className="flex justify-center items-center gap-2">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="p-2 rounded-md border border-black/10 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-black/5 transition-colors"
                                >
                                    <ChevronLeft size={20} />
                                </button>

                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                    <button
                                        key={page}
                                        onClick={() => handlePageChange(page)}
                                        className={`w-10 h-10 rounded-md border transition-colors font-medium ${currentPage === page
                                                ? "bg-ink text-white border-ink"
                                                : "border-black/10 hover:bg-black/5 text-ink"
                                            }`}
                                    >
                                        {page}
                                    </button>
                                ))}

                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="p-2 rounded-md border border-black/10 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-black/5 transition-colors"
                                >
                                    <ChevronRight size={20} />
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default BlogList;
