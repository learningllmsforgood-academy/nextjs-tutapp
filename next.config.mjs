/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    // configuring static export from next.js
    // docs: https://nextjs.org/docs/pages/building-your-application/deploying/static-exports

    output: 'export',
    images: {
        unoptimized: true,
    },
};

const basePath = process.env.BASE_PATH;

if (basePath) {
    nextConfig.basePath = basePath;
    nextConfig.images = {
        // if we have a basePath then need to manually append prefix on all image paths
        // https://nextjs.org/docs/pages/api-reference/next-config-js/basePath#images
        // this custom loaders tries to fix that
        loader: 'custom',
        loaderFile: './image-loader.js',
        // note: base path must also be set on the image-loader file
    }
}

export default nextConfig;
