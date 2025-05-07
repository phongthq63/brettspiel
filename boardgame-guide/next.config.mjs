/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false, // production should be false
    devIndicators: true, // production should be false
    transpilePackages: ['three'],
};

export default nextConfig;
