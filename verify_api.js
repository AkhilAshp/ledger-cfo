
const fetch = require('node-fetch');

const API_BASE = "https://ledgerscfo.com/api/blog/api";

async function probe(pageSize) {
    console.log(`Probing with pageSize=${pageSize}...`);
    try {
        const res = await fetch(`${API_BASE}/blogs.php?page=1&pageSize=${pageSize}`);
        const json = await res.json();
        console.log(`Status: ${res.status}`);
        console.log(`Pagination:`, json.pagination);
        console.log(`Data length:`, json.data ? json.data.length : 0);
    } catch (e) {
        console.error("Error:", e.message);
    }
}

// Check if we can get more than 50
probe(100);
probe(200);
