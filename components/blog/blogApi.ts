const API_BASE = 'http://localhost/blog-backend-php';

export interface Blog {
    ID: number;
    post_author: string;
    post_date: string;
    post_title: string;
    post_excerpt?: string;
    post_content?: string;
    post_name: string;
    post_status: string;
}

export interface BlogListResponse {
    success: boolean;
    data: Blog[];
    pagination: {
        currentPage: number;
        pageSize: number;
        totalItems: number;
        totalPages: number;
        hasNextPage: boolean;
        hasPrevPage: boolean;
    };
}

export interface BlogDetailResponse {
    success: boolean;
    data: Blog;
}

export const blogApi = {
    async getBlogs(page: number = 1, pageSize: number = 10): Promise<BlogListResponse> {
        const response = await fetch(`${API_BASE}/api/blogs?page=${page}&pageSize=${pageSize}`);
        if (!response.ok) throw new Error('Failed to fetch blogs');
        return response.json();
    },

    async getBlog(slug: string): Promise<BlogDetailResponse> {
        const response = await fetch(`${API_BASE}/api/blog.php?slug=${slug}`);
        if (!response.ok) throw new Error('Blog not found');
        return response.json();
    }
};
