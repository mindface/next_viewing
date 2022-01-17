import type { NextPage } from 'next'
import Head from 'next/head'
import SectionDashbord from "../components/SectionDashbord";
import SectionHeader from "../components/SectionHeader";

const Home: NextPage = () => {
  return (
    <div className="dashbord">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SectionHeader />
      <SectionDashbord />
    </div>
  )
}

export default Home
