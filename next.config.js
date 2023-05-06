/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "cloudflare-ipfs.com",
                // port: "",
                // pathname: "/account123/**",
            },
        ],
    },
};

module.exports = nextConfig;
