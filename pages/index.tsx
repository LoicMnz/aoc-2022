import Head from "next/head";
import styles from "../styles/Home.module.css";
import Layout from "components/layout";

export default function Home() {
  return (
    <Layout>
      <div className={styles.container}>
        <Head>
          <title>Advent of Code 2022</title>
          <meta name="description" content="Advent of Code 2022" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
      </div>
    </Layout>
  );
}
