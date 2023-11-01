'use client'

export default function imageLoaderWithBasePath({ src, width, quality }) {
    // next/Image does not support basePath
    // see: https://nextjs.org/docs/app/api-reference/next-config-js/basePath#images
    // this loader gets around that

    if (basePath) {
        src = basePath + src;
    }

    return src;
}

let basePath; // overwrite this to change the image base path
