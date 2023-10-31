import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { getOgImageUrl } from "../lib/utils";

import styles from './layout.module.css';
import utilStyles from '../styles/utils.module.css';

const name = 'Learning App';
const siteTitle = 'A simple blog';
const ogImageUrl = getOgImageUrl(siteTitle);

function ProfileImage({ isHome }) {
    const h = isHome ? 144 : 108;
    const w = isHome ? 144 : 108;
    return (
        <Image
            priority
            src="/images/profile.png"
            className={utilStyles.borderCircle}
            height={h}
            width={w}
            alt={`${name} - Profile Image`}
        />
    );
}

function HeaderContent({ isHome }) {
    const profileImage = <ProfileImage isHome={isHome}/>;
    if (isHome) {
        return (<>
            {profileImage}
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
        </>);
    }
    return (<>
        <Link href="/">{profileImage}</Link>
        <h2 className={utilStyles.headingLg}>
            <Link href="/" className={utilStyles.colorInherit}>
                {name}
            </Link>
        </h2>
    </>);
}

function getBackToHomeLink() {
    return (
        <div className={styles.backToHome}>
            <Link href="/">← Back to home</Link>
        </div>
    );
}

function Layout({ children, home }) {
    return (
        <div className={styles.container}>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <meta 
                    name="description"
                    content="Learn how to build a personal website using Next.js"
                />
                <meta 
                    property="og:image"
                    content={ogImageUrl}
                />
                <meta name="og:title" content={siteTitle} />
                <meta name="twitter:card" content="summary_large_image" />
            </Head>
            <header className={styles.header}>
                <HeaderContent isHome={!!home} />
            </header>
            <main>{children}</main>
            {home || getBackToHomeLink()}
        </div>
    )    
}

export default Layout;
export { siteTitle };
