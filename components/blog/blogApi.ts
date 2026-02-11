// const API_BASE = 'http://localhost:8000';

// export interface Blog {
//     ID: number;
//     post_title: string;
//     post_excerpt?: string;
//     post_content?: string;
//     post_date: string;
//     post_name: string;
// }

// export interface BlogListResponse {
//     success: boolean;
//     data: Blog[];
//     pagination: {
//         currentPage: number;
//         pageSize: number;
//         totalItems: number;
//         totalPages: number;
//         hasNextPage: boolean;
//         hasPrevPage: boolean;
//     };
// }

// export interface BlogDetailResponse {
//     success: boolean;
//     data: Blog;
// }

// export const blogApi = {
//     async getBlogs(page: number = 1, pageSize: number = 10): Promise<BlogListResponse> {
//         const response = await fetch(`${API_BASE}/api/blogs?page=${page}&pageSize=${pageSize}`);
//         if (!response.ok) throw new Error('Failed to fetch blogs');
//         return response.json();
//     },

//     async getBlog(slug: string): Promise<BlogDetailResponse> {
//         const response = await fetch(`${API_BASE}/api/blogs/${slug}`);
//         if (!response.ok) throw new Error('Blog not found');
//         return response.json();
//     }
// };
const API_BASE = "http://localhost:8000/api";

export async function fetchBlogs() {
    const res = await fetch(`${API_BASE}/blogs`);
    if (!res.ok) throw new Error("Failed to fetch blogs");
    return res.json();
}

export async function fetchBlog(slug: string) {
    const res = await fetch(`${API_BASE}/blogs/${slug}`);
    if (!res.ok) throw new Error("Failed to fetch blog");
    return res.json();
}
