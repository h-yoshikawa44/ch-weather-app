import { Fragment } from 'react';
import Head from 'next/head';
import HomePage from '@/components/page/Home';

const Home = () => {
  return (
    <Fragment>
      <Head>
        <title>Weather app</title>
        <meta
          name="description"
          content="devChallenges.io(legacy) - Weather app | by h-yoshikawa44"
        />
      </Head>
      <HomePage />
    </Fragment>
  );
};

export default Home;
