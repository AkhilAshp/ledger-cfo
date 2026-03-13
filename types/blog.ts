export interface Blog {
    ID: number;
    post_title: string;
    post_excerpt?: string;
    post_content?: string;
    post_date: string;
    post_name: string;
    slug?: string;
    meta_description?: string;
    featured_image?: string;
}
