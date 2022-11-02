import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>TikTok Clone</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='shortcut icon' href='/images/favicon.ico' />
      </Head>
      <main>
        <h1 className='text-3xl font-bold underline'>
          Hello world!
        </h1>
      </main>
      <footer>
      </footer>
    </div>
  )
};

export default Home
