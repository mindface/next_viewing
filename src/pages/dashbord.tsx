import type { NextPage } from 'next'
import Head from 'next/head'
import SectionDashbord from "../components/SectionDashbord";
import FixedBottomBtn from "../components/FixedBottomBtn";

const Dashbord: NextPage = () => {
  return (
    <div className="dashbord">
      <Head>
        <title>dashbord</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SectionDashbord />
      {/* <FixedBottomBtn /> */}
    </div>
  )
}

export default Dashbord
