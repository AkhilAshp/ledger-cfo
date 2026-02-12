import React, { useState } from "react";
import { Archive, ChevronRight } from "lucide-react";
import { Blog } from "../types/blog";

/* ─── Types ─────────────────────────────────────────────────────── */

interface MonthGroup {
    label: string;       // e.g. "January 2025"
    key: string;         // e.g. "2025-01"
    count: number;
    blogs: Blog[];
}

interface ArchiveSidebarProps {
    blogs: Blog[];
    /** Called when user clicks a blog link inside an archive month */
    onBlogClick?: (slug: string) => void;
    /** Called when user selects / clears a month filter */
    onMonthFilter?: (key: string | null) => void;
    activeMonth?: string | null;
}

/* ─── Helper: group blogs by month ─────────────────────────────── */

function groupByMonth(blogs: Blog[]): MonthGroup[] {
    const map = new Map<string, { label: string; blogs: Blog[] }>();

    blogs.forEach((blog) => {
        const date = new Date(blog.post_date);
        // key = "YYYY-MM" for sorting
        const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
        const label = date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
        if (!map.has(key)) map.set(key, { label, blogs: [] });
        map.get(key)!.blogs.push(blog);
    });

    // Sort newest month first
    return Array.from(map.entries())
        .sort(([a], [b]) => b.localeCompare(a))
        .map(([key, { label, blogs }]) => ({
            key,
            label,
            count: blogs.length,
            blogs: blogs.sort(
                (a, b) => new Date(b.post_date).getTime() - new Date(a.post_date).getTime()
            ),
        }));
}

/* ─── Month Row ─────────────────────────────────────────────────── */

const MonthRow: React.FC<{
    group: MonthGroup;
    isActive: boolean;
    isExpanded: boolean;
    onToggleExpand: () => void;
    onMonthFilter?: (key: string | null) => void;
    onBlogClick?: (slug: string) => void;
}> = ({ group, isActive, isExpanded, onToggleExpand, onMonthFilter, onBlogClick }) => {
    return (
        <li>
            {/* Month header row */}
            {/* Month header row */}
            <div className="px-4 py-1">
                <button
                    onClick={() => {
                        if (onMonthFilter) {
                            onMonthFilter(isActive ? null : group.key);
                        }
                        onToggleExpand();
                    }}
                    className={[
                        "w-full flex items-center justify-between px-4 py-2.5 rounded text-sm font-medium transition-all duration-200",
                        isActive
                            ? "bg-ink text-white shadow-sm"
                            : "bg-white text-ink/70 hover:bg-gray-50 hover:text-ink border border-black/5",
                    ].join(" ")}
                >
                    {/* Left: expand chevron + month label */}
                    <div className="flex items-center gap-3 min-w-0">
                        <ChevronRight
                            size={14}
                            className={[
                                "transition-transform duration-200 shrink-0",
                                isExpanded ? "rotate-90" : "",
                                isActive ? "text-white" : "text-muted/60"
                            ].join(" ")}
                        />
                        <span className="truncate">{group.label}</span>
                    </div>

                    {/* Right: pill with count */}
                    <span
                        className={[
                            "shrink-0 ml-3 inline-flex items-center justify-center",
                            "min-w-[1.4rem] h-[1.4rem] px-1.5 rounded-full text-[10px] font-bold",
                            "transition-colors duration-150",
                            isActive
                                ? "bg-white text-ink"
                                : "bg-black/5 text-muted",
                        ].join(" ")}
                    >
                        {group.count}
                    </span>
                </button>
            </div>

            {/* Expanded blog list */}
            <div
                className={[
                    "overflow-hidden transition-all duration-300 ease-in-out",
                    isExpanded ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0",
                ].join(" ")}
            >
                <ul className="pb-1 pt-0.5">
                    {group.blogs.map((blog) => (
                        <li key={blog.slug}>
                            <a
                                href={`/blog/${blog.slug}`}
                                onClick={(e) => {
                                    if (onBlogClick) {
                                        e.preventDefault();
                                        onBlogClick(blog.slug);
                                    }
                                }}
                                className={[
                                    "flex items-start gap-2.5 pl-12 pr-5 py-2",
                                    "text-xs leading-snug text-muted hover:text-ink",
                                    "transition-colors duration-150 group/link",
                                ].join(" ")}
                            >
                                {/* Tiny bullet */}
                                <span className="mt-[5px] shrink-0 w-1 h-1 rounded-full bg-black/15 group-hover/link:bg-ink/40 transition-colors" />
                                <span className="line-clamp-2">{blog.post_title}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </li>
    );
};

/* ─── Main Component ─────────────────────────────────────────────── */

const ArchiveSidebar: React.FC<ArchiveSidebarProps> = ({
    blogs,
    onBlogClick,
    onMonthFilter,
    activeMonth = null,
}) => {
    const groups = groupByMonth(blogs);
    // Track which month panels are open (expanded)
    const [expandedKeys, setExpandedKeys] = useState<Set<string>>(new Set());

    if (!groups.length) return null;

    const toggleExpand = (key: string) => {
        setExpandedKeys((prev) => {
            const next = new Set(prev);
            if (next.has(key)) next.delete(key);
            else next.add(key);
            return next;
        });
    };

    const totalPosts = blogs.length;

    return (
        <nav aria-label="Blog archives" className="bg-white border border-black/5 rounded-sm overflow-hidden">

            {/* ── Card header ── */}
            <div className="px-5 pt-4 pb-3 border-b border-black/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Archive size={12} className="text-muted shrink-0" />
                    <span className="text-[10px] font-semibold tracking-[0.16em] uppercase text-muted">
                        Archives
                    </span>
                </div>
                <span className="text-[10px] text-muted/60 font-medium">
                    {totalPosts} {totalPosts === 1 ? "post" : "posts"}
                </span>
            </div>

            {/* ── "All posts" button ── */}
            <div className="px-4 py-3 border-b border-black/5">
                <button
                    onClick={() => onMonthFilter && onMonthFilter(null)}
                    className={[
                        "w-full flex items-center justify-between px-4 py-2.5 rounded text-sm font-medium transition-all duration-200",
                        !activeMonth
                            ? "bg-ink text-white shadow-sm"
                            : "bg-gray-50 text-ink/70 hover:bg-gray-100 hover:text-ink border border-black/5",
                    ].join(" ")}
                >
                    <span>All Posts</span>
                    <span
                        className={[
                            "inline-flex items-center justify-center min-w-[1.4rem] h-[1.4rem] px-1.5 rounded-full text-[10px] font-bold",
                            !activeMonth
                                ? "bg-white text-ink"
                                : "bg-black/5 text-muted",
                        ].join(" ")}
                    >
                        {totalPosts}
                    </span>
                </button>
            </div>

            {/* ── Month list ── */}
            <ul className="py-1" role="list">
                {groups.map((group) => (
                    <MonthRow
                        key={group.key}
                        group={group}
                        isActive={activeMonth === group.key}
                        isExpanded={expandedKeys.has(group.key)}
                        onToggleExpand={() => toggleExpand(group.key)}
                        onMonthFilter={onMonthFilter}
                        onBlogClick={onBlogClick}
                    />
                ))}
            </ul>


        </nav>
    );
};

export default ArchiveSidebar;
