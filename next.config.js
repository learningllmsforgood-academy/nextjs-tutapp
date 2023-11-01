/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    // configuring static export from next.js
    // docs: https://nextjs.org/docs/pages/building-your-application/deploying/static-exports

    output: 'export',
    images: {
        // unoptimized: true,
        // ^ unoptimized cannot handle a different base path
        loader: 'custom',
        loaderFile: './image-loader.js',
    }
}

const basePath = process.env.BASE_PATH;

if (basePath) {
    nextConfig.basePath = basePath;
}

module.exports = nextConfig
