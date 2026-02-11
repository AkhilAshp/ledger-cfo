import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const HashScrollHandler = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        // Handle hash scrolling
        const handleHashScroll = () => {
            const hash = location.hash;

            if (hash) {
                // Remove the # from hash
                const id = hash.substring(1);

                // Wait for DOM to be ready and route to be fully loaded
                const scrollToElement = () => {
                    const element = document.getElementById(id);

                    if (element) {
                        // Get navbar height to offset scroll position
                        const navbarHeight = 80; // h-20 class = 80px
                        const elementPosition = element.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                    }
                };

                // Use requestAnimationFrame to ensure DOM is painted
                requestAnimationFrame(() => {
                    setTimeout(scrollToElement, 100);
                });
            }
        };

        handleHashScroll();
    }, [location.pathname, location.hash]);

    // Handle clicks on hash links when not on home page
    useEffect(() => {
        const handleHashLinkClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const link = target.closest('a');

            if (link && link.getAttribute('href')?.startsWith('/#')) {
                const hash = link.getAttribute('href')?.substring(1); // Remove leading /

                // If we're not on the home page, navigate there first
                if (location.pathname !== '/') {
                    e.preventDefault();
                    navigate('/' + hash);
                }
            }
        };

        document.addEventListener('click', handleHashLinkClick);
        return () => document.removeEventListener('click', handleHashLinkClick);
    }, [location.pathname, navigate]);

    return null;
};

export default HashScrollHandler;
