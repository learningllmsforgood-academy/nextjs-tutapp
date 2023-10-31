import Head from 'next/head';
import Layout from '../../components/layout';
import Date from '../../components/date';
import { getAllPostIds, getPostDataWithContent } from '../../lib/posts';

import utilStyles from '../../styles/utils.module.css';
import { clsx } from 'clsx';

export default function Post({ postData }) {
    const { title, date, postMeta, contentHtml } = postData;
    const useGithubCSS = !!postMeta['use-github-css'];

    return (
        <Layout>
            <Head>
                <title>{title}</title>
            </Head>
            <article>
                <h1 className={utilStyles.headingXl}>{postData.title}</h1>
                <div className={utilStyles.lightText}>
                    <Date dateString={date} />
                </div>
                <div
                    className={clsx(useGithubCSS && [ utilStyles.padding20px, 'markdown-body' ])}
                    dangerouslySetInnerHTML={{ __html: contentHtml }} 
                />
            </article>
        </Layout>
    );
}

export async function getStaticPaths() {
    // Return a list of possible value for id
    const paths = getAllPostIds();
    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ params }) {
    // Fetch necessary data for the blog post using params.id
    const postData = await getPostDataWithContent(params.id);
    return {
        props: {
            postData,
        },
    };
}
