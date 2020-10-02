import Head from 'next/head';

import utilStyles from '../styles/utils.module.css';
import Layout, { siteTitle } from '../components/Layout';

import { getSortedPostsData } from '../lib/posts';

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Hello.</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map((post) => {
            return (
              <li className={utilStyles.listItem} key={post.id}>
                {post.title}
                <br />
                {post.id}
                <br />
                {post.date}
              </li>
            );
          })}
        </ul>
      </section>
    </Layout>
  );
}
