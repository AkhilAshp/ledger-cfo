import { Blog } from "../types/blog";

const API_BASE = "https://ledgerscfo.com/api/blog/api";

const isPrerender = typeof navigator !== "undefined" && navigator.userAgent === "ReactSnap";

/**
 * Fetch all blogs
 * GET /api/blogs.php
 */
interface PaginationData {
    currentPage: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
}

interface BlogsResponse {
    data: Blog[];
    pagination: PaginationData;
}

/**
 * Fetch all blogs with pagination
 * GET /api/blogs.php?page=1&pageSize=9
 */
export async function fetchBlogs(page = 1, pageSize = 9): Promise<BlogsResponse> {
    if (isPrerender) {
        return {
            data: [
                {
                    ID: "prerender-list",
                    post_title: "Accounting and Tax Solutions",
                    post_name: "accounting-solutions",
                    slug: "accounting-solutions",
                    post_excerpt: "Learn the latest financial best practices.",
                    post_date: new Date().toISOString(),
                    post_content: "<h2>Expert Accounting</h2><p>This content is optimized for SEO and loads dynamically.</p>",
                    meta_description: "Expert financial services."
                } as unknown as Blog
            ],
            pagination: { currentPage: 1, pageSize, totalItems: 1, totalPages: 1, hasNextPage: false, hasPrevPage: false }
        };
    }

    try {
        const res = await fetch(`${API_BASE}/blogs.php?page=${page}&pageSize=${pageSize}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!res.ok) {
            throw new Error("Failed to fetch blogs");
        }

        const json = await res.json();
        return {
            data: json.data || [],
            pagination: json.pagination
        };
    } catch (err) {
        console.error(err);
        return {
            data: [],
            pagination: { currentPage: 1, pageSize, totalItems: 0, totalPages: 1, hasNextPage: false, hasPrevPage: false }
        };
    }
}

/**
 * Fetch single blog by slug
 * GET /api/blog.php?slug=:slug
 */
export async function fetchBlog(slug: string): Promise<Blog> {
    if (isPrerender) {
        return {
            ID: "prerender-detail",
            post_title: slug.replace(/-/g, ' ').toUpperCase(),
            post_name: slug,
            slug: slug,
            post_excerpt: "Expert financial services for scaling your startup.",
            post_date: new Date().toISOString(),
            post_content: `<h2>${slug.replace(/-/g, ' ').toUpperCase()}</h2><p>This is placeholder content optimized for search engines indexing ledgersCFO. The real content loads dynamically for users.</p>`,
            meta_description: "Expert financial services for startups.",
            post_author: "LedgersCFO Team"
        } as unknown as Blog;
    }

    try {
        const res = await fetch(`${API_BASE}/blog.php?slug=${slug}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!res.ok) {
            if (res.status === 404) {
                throw new Error("Blog not found");
            }
            throw new Error("Failed to fetch blog");
        }

        const json = await res.json();
        return json.data;
    } catch (err) {
        console.error(err);
        throw err; // Let it throw so the component can render the error UI if it happens on client
    }
}

/**
 * Fetch all blogs for archives (handles pagination to get all posts)
 * Iterates through all pages to retrieve the full list.
 */
export async function fetchAllBlogs(): Promise<Blog[]> {
    try {
        // Fetch first page to get pagination data
        const firstPage = await fetchBlogs(1, 50);
        let allBlogs = [...firstPage.data];
        const { totalPages } = firstPage.pagination;

        // If there are more pages, fetch them in parallel
        if (totalPages > 1) {
            const pagePromises = [];
            for (let page = 2; page <= totalPages; page++) {
                pagePromises.push(fetchBlogs(page, 50));
            }

            const responses = await Promise.all(pagePromises);
            responses.forEach(response => {
                allBlogs = [...allBlogs, ...response.data];
            });
        }

        return allBlogs;
    } catch (error) {
        console.error("Failed to fetch all blogs:", error);
        throw error;
    }
}
