import type { NextPage } from 'next'
import Head from 'next/head'
import SectionStructures from "../components/SectionStructures";

const Structures: NextPage = () => {
  return (
    <div className="structures">
      <Head>
        <title>作成したリスト</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SectionStructures />
    </div>
  )
}

export default Structures
