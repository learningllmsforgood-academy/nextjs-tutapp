/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    // configuring static export from next.js
    // docs: https://nextjs.org/docs/pages/building-your-application/deploying/static-exports

    output: 'export',
    images: {
        unoptimized: true,
    }
}
   
module.exports = nextConfig
