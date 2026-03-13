import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateRoutes() {
    console.log('Fetching blogs from API to generate static routes...');
    try {
        const res = await fetch('https://ledgerscfo.com/api/blog/api/blogs.php?page=1&pageSize=500');
        if (!res.ok) {
            throw new Error(`API returned ${res.status}`);
        }

        const json = await res.json();
        const blogs = json.data || [];

        const routes = ['/', '/blog'];
        blogs.forEach(blog => {
            if (blog.slug) {
                routes.push(`/blog/${blog.slug}`);
            } else if (blog.post_name) {
                routes.push(`/blog/${blog.post_name}`);
            }
        });

        // Use absolute path for package.json
        const packageJsonPath = path.resolve(__dirname, '../package.json');

        const packageContent = fs.readFileSync(packageJsonPath, 'utf8');
        const packageJson = JSON.parse(packageContent);

        packageJson.reactSnap = packageJson.reactSnap || {};
        packageJson.reactSnap.include = routes;

        fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

        console.log(`Successfully added ${routes.length} routes to package.json for prerendering!`);
    } catch (e) {
        console.error('Error generating routes:', e);
        process.exit(1);
    }
}

generateRoutes();
