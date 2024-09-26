/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            'robohash.org',
            'th.bing.com',
            'media.metrolatam.com',
            'localhost',
            'backendiaecommerce.onrender.com' // Añade este dominio
        ]
    }
};

module.exports = nextConfig;
