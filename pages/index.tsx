import Head from "next/head";
import Link from "next/link";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";
import Date from "../components/date";
import React, { useState, useEffect, Fragment } from "react";
import Tabletop from "Tabletop";

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    Tabletop.init({
      key: "1XrMZqr4aL_XbP5ULfzvMg1a6G2GUOjpmsi1Rr0JviAw", // Hide it later.
      simpleSheet: true,
    })
      .then((data) => setData(data))
      .catch((err) => console.warn(err)); // Fix it later.
  }, []);

  console.log("retrieved data>>>", data); // Delete it later.

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>I'm Newt0.</p>
      </section>
      <section>
        <h1>Fetch the data from google spread sheets.</h1>
        <ul>
          {data.map((item, i) => (
            <Fragment key={i}>
              <li>URL -- {item.url}</li>
              <li>Email -- {item.email}</li>
              <li>Token -- {item.token}</li>
              <br />
            </Fragment>
          ))}
        </ul>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
