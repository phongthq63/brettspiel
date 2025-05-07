/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false, // production should be false
    devIndicators: false, // production should be false
    images: {
        remotePatterns: [new URL('https://example.com/**')]
    },
    transpilePackages: ['three'],
};

export default nextConfig;
