import { Blog } from "../types/blog";

const API_BASE = "https://ledgerscfo.com/api/blog/api";

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
}

/**
 * Fetch single blog by slug
 * GET /api/blog.php?slug=:slug
 */
export async function fetchBlog(slug: string): Promise<Blog> {
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
}
