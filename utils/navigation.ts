/**
 * Navigate to a route with hash and scroll to the element
 * @param path - The path to navigate to (e.g., '/#pricing', '/blog#section')
 * @param navigate - React Router's navigate function
 */
export const navigateWithScroll = (
    path: string,
    navigate: (path: string) => void
) => {
    const [route, hash] = path.split('#');

    if (hash) {
        // Navigate to the route with hash
        navigate(`${route}#${hash}`);
    } else {
        // Navigate without hash
        navigate(route);
    }
};

/**
 * Scroll to an element by ID with navbar offset
 * @param elementId - The ID of the element to scroll to
 * @param navbarHeight - Height of the navbar (default: 80px)
 */
export const scrollToElement = (
    elementId: string,
    navbarHeight: number = 80
) => {
    const element = document.getElementById(elementId);

    if (element) {
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
};

/**
 * Check if we're on a specific route
 * @param pathname - Current pathname
 * @param route - Route to check against
 */
export const isOnRoute = (pathname: string, route: string): boolean => {
    return pathname === route;
};
