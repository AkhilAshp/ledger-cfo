// // import React, { useEffect, useState } from 'react';
// // import { Link } from 'react-router-dom';
// // import { blogApi, Blog } from './blogApi';
// // import { Calendar, ArrowRight } from 'lucide-react';

// // const BlogList: React.FC = () => {
// //     const [blogs, setBlogs] = useState<Blog[]>([]);
// //     const [loading, setLoading] = useState(true);
// //     const [error, setError] = useState<string | null>(null);
// //     const [currentPage, setCurrentPage] = useState(1);
// //     const [totalPages, setTotalPages] = useState(1);

// //     useEffect(() => {
// //         blogApi.getBlogs(currentPage)
// //             .then(response => {
// //                 setBlogs(response.data);
// //                 setTotalPages(response.pagination.totalPages);
// //             })
// //             .catch(err => setError(err.message))
// //             .finally(() => setLoading(false));
// //     }, [currentPage]);

// //     if (loading) {
// //         return (
// //             <div className="min-h-screen bg-paper flex items-center justify-center">
// //                 <div className="text-center">
// //                     <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-ink border-r-transparent"></div>
// //                     <p className="mt-4 text-muted">Loading blogs...</p>
// //                 </div>
// //             </div>
// //         );
// //     }

// //     if (error) {
// //         return (
// //             <div className="min-h-screen bg-paper flex items-center justify-center">
// //                 <div className="text-center">
// //                     <p className="text-red-600 font-medium">Error: {error}</p>
// //                     <p className="text-muted mt-2">Make sure the backend is running on port 8000</p>
// //                 </div>
// //             </div>
// //         );
// //     }

// //     return (
// //         <div className="min-h-screen bg-paper py-20">
// //             <div className="max-w-6xl mx-auto px-6 lg:px-8">
// //                 <div className="text-center mb-16">
// //                     <h1 className="font-serif text-5xl font-medium text-ink mb-4">Blog</h1>
// //                     <p className="text-lg text-muted max-w-2xl mx-auto">
// //                         Insights, updates, and stories from our team
// //                     </p>
// //                 </div>

// //                 {blogs.length === 0 ? (
// //                     <div className="text-center py-20">
// //                         <p className="text-muted text-lg">No blog posts yet. Check back soon!</p>
// //                     </div>
// //                 ) : (
// //                     <>
// //                         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
// //                             {blogs.map((blog) => (
// //                                 <Link
// //                                     key={blog.ID}
// //                                     to={`/blog/${blog.post_name}`}
// //                                     className="group bg-white border border-black/10 rounded-sm overflow-hidden hover:shadow-lg transition-all duration-300"
// //                                 >
// //                                     <div className="p-6">
// //                                         <h2 className="font-serif text-2xl font-medium text-ink mb-3 group-hover:text-black transition-colors">
// //                                             {blog.post_title}
// //                                         </h2>
// //                                         <div className="flex items-center gap-4 text-sm text-muted mb-4">
// //                                             <span className="flex items-center gap-1">
// //                                                 <Calendar size={14} />
// //                                                 {new Date(blog.post_date).toLocaleDateString('en-US', {
// //                                                     month: 'short',
// //                                                     day: 'numeric',
// //                                                     year: 'numeric'
// //                                                 })}
// //                                             </span>
// //                                         </div>
// //                                         {blog.post_excerpt && (
// //                                             <p className="text-muted text-sm mb-4 line-clamp-3">
// //                                                 {blog.post_excerpt}
// //                                             </p>
// //                                         )}
// //                                         <div className="flex items-center text-ink font-medium text-sm group-hover:gap-2 transition-all">
// //                                             Read more
// //                                             <ArrowRight size={16} className="ml-1" />
// //                                         </div>
// //                                     </div>
// //                                 </Link>
// //                             ))}
// //                         </div>

// //                         {totalPages > 1 && (
// //                             <div className="flex justify-center items-center gap-4 mt-12">
// //                                 <button
// //                                     onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
// //                                     disabled={currentPage === 1}
// //                                     className="px-4 py-2 border border-black/10 rounded-sm text-ink disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
// //                                 >
// //                                     Previous
// //                                 </button>
// //                                 <span className="text-muted">
// //                                     Page {currentPage} of {totalPages}
// //                                 </span>
// //                                 <button
// //                                     onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
// //                                     disabled={currentPage === totalPages}
// //                                     className="px-4 py-2 border border-black/10 rounded-sm text-ink disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
// //                                 >
// //                                     Next
// //                                 </button>
// //                             </div>
// //                         )}
// //                     </>
// //                 )}
// //             </div>
// //         </div>
// //     );
// // };

// // export default BlogList;
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { Calendar, ArrowRight } from "lucide-react";

// interface Blog {
//     ID: number;
//     post_title: string;
//     post_excerpt?: string;
//     post_date: string;
//     post_name: string;
// }

// const BlogList: React.FC = () => {
//     const [blogs, setBlogs] = useState<Blog[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         fetch("http://localhost:8000/api/blogs")
//             .then((res) => {
//                 if (!res.ok) throw new Error("Failed to fetch blogs");
//                 return res.json();
//             })
//             .then((data) => {
//                 console.log("BLOG DATA:", data); // ✅ debug
//                 setBlogs(data);
//             })
//             .catch((err) => setError(err.message))
//             .finally(() => setLoading(false));
//     }, []);

//     if (loading) {
//         return (
//             <div className="min-h-screen bg-paper flex items-center justify-center">
//                 <p className="text-muted">Loading blogs...</p>
//             </div>
//         );
//     }

//     if (error) {
//         return (
//             <div className="min-h-screen bg-paper flex items-center justify-center">
//                 <p className="text-red-600 font-medium">{error}</p>
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-paper py-20">
//             <div className="max-w-6xl mx-auto px-6 lg:px-8">
//                 <div className="text-center mb-16">
//                     <h1 className="font-serif text-5xl font-medium text-ink mb-4">
//                         Blog
//                     </h1>
//                     <p className="text-lg text-muted max-w-2xl mx-auto">
//                         Insights, updates, and stories from our team
//                     </p>
//                 </div>

//                 {blogs.length === 0 ? (
//                     <p className="text-center text-muted">
//                         No blog posts yet.
//                     </p>
//                 ) : (
//                     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
//                         {blogs.map((blog) => (
//                             <Link
//                                 key={blog.ID}
//                                 to={`/blog/${blog.post_name}`}
//                                 className="group bg-white border border-black/10 rounded-sm overflow-hidden hover:shadow-lg transition-all"
//                             >
//                                 <div className="p-6">
//                                     <h2 className="font-serif text-2xl font-medium text-ink mb-3">
//                                         {blog.post_title}
//                                     </h2>

//                                     <div className="flex items-center gap-2 text-sm text-muted mb-4">
//                                         <Calendar size={14} />
//                                         {new Date(blog.post_date).toLocaleDateString()}
//                                     </div>

//                                     {blog.post_excerpt && (
//                                         <p className="text-muted text-sm mb-4 line-clamp-3">
//                                             {blog.post_excerpt}
//                                         </p>
//                                     )}

//                                     <div className="flex items-center text-ink font-medium text-sm">
//                                         Read more <ArrowRight size={16} className="ml-1" />
//                                     </div>
//                                 </div>
//                             </Link>
//                         ))}
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default BlogList;
