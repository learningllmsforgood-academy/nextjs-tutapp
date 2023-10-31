import Head from 'next/head';
import Layout from '../components/layout';

import utilStyles from '../styles/utils.module.css';

export default function Custom404() {
    return (
        <Layout>
            <Head>
                <title>Page Not Found</title>
            </Head>
            <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
                <h1>Page Not Found</h1>    
            </section>
        </Layout>
    );
}
