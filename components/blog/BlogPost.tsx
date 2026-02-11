import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogApi, Blog } from './blogApi';
import { Calendar, ArrowLeft } from 'lucide-react';

const BlogPost: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const [blog, setBlog] = useState<Blog | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!slug) return;

        blogApi.getBlog(slug)
            .then(response => setBlog(response.data))
            .catch(err => setError(err.message))
            .finally(() => setLoading(false));
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen bg-paper flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-ink border-r-transparent"></div>
                    <p className="mt-4 text-muted">Loading blog post...</p>
                </div>
            </div>
        );
    }

    if (error || !blog) {
        return (
            <div className="min-h-screen bg-paper flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600 font-medium mb-4">
                        {error || 'Blog post not found'}
                    </p>
                    <Link
                        to="/blog"
                        className="inline-flex items-center gap-2 text-ink hover:text-black font-medium"
                    >
                        <ArrowLeft size={16} />
                        Back to Blog
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-paper py-20">
            <div className="max-w-4xl mx-auto px-6 lg:px-8">
                <Link
                    to="/blog"
                    className="inline-flex items-center gap-2 text-muted hover:text-ink font-medium mb-8 transition-colors"
                >
                    <ArrowLeft size={16} />
                    Back to Blog
                </Link>

                <article>
                    <header className="mb-12">
                        <h1 className="font-serif text-5xl font-medium text-ink mb-6">
                            {blog.post_title}
                        </h1>

                        <div className="flex items-center gap-6 text-muted mb-6">
                            <span className="flex items-center gap-2">
                                <Calendar size={18} />
                                {new Date(blog.post_date).toLocaleDateString('en-US', {
                                    month: 'long',
                                    day: 'numeric',
                                    year: 'numeric'
                                })}
                            </span>
                        </div>
                    </header>

                    <div
                        className="prose prose-lg max-w-none text-ink"
                        dangerouslySetInnerHTML={{ __html: blog.post_content || '' }}
                    />
                </article>
            </div>
        </div>
    );
};

export default BlogPost;
