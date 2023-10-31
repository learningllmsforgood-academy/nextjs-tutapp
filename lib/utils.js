export function getOgImageUrl(siteTitle) {
    // use vercel's Open Graph Image generator
	// https://github.com/vercel/og-image
	// note: this is actually deprecated now
	// refs:
	// https://vercel.com/blog/introducing-vercel-og-image-generation-fast-dynamic-social-card-images 
	// https://vercel.com/docs/functions/edge-functions/og-image-generation

    const base = "https://og-image.vercel.app";
	const path = `/${siteTitle}.png`;
	const queryParams = {
	  "theme": "light",
	  "md": "0",
	  "fontSize": "75px",
	  "images": "https://assets.vercel.com/image/upload/front/assets/design/nextjs-black-logo.svg"
	};

	const pathStr = encodeURI(path);
	const queryParamsStr = new URLSearchParams(queryParams).toString();

	const url = `${base}${pathStr}?${queryParamsStr}`;
	return url;
}
