import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateRoutes() {
    console.log('Fetching blogs from API to generate static routes...');

    try {
        const res = await fetch('https://ledgerscfo.com/api/blog/api/blogs.php?page=1&pageSize=500', {
            headers: { 'Content-Type': 'application/json' }
        });

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

        const packageJsonPath = path.resolve(__dirname, '../package.json');
        const packageContent = fs.readFileSync(packageJsonPath, 'utf8');
        const packageJson = JSON.parse(packageContent);

        packageJson.reactSnap = packageJson.reactSnap || {};
        packageJson.reactSnap.include = routes;
        packageJson.reactSnap.puppeteerExecutablePath = puppeteer.executablePath();
        packageJson.reactSnap.puppeteerArgs = ["--no-sandbox", "--disable-setuid-sandbox"];

        fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

        console.log(`Successfully added ${routes.length} routes to package.json for prerendering!`);

    } catch (e) {
        console.error('⚠️ API fetch failed, continuing build without blog routes.');
        console.error(e);

        // fallback routes so build never fails
        const routes = ['/', '/blog'];

        const packageJsonPath = path.resolve(__dirname, '../package.json');
        const packageContent = fs.readFileSync(packageJsonPath, 'utf8');
        const packageJson = JSON.parse(packageContent);

        packageJson.reactSnap = packageJson.reactSnap || {};
        packageJson.reactSnap.include = routes;
        packageJson.reactSnap.puppeteerExecutablePath = puppeteer.executablePath();
        packageJson.reactSnap.puppeteerArgs = ["--no-sandbox", "--disable-setuid-sandbox"];

        fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    }
}

generateRoutes();