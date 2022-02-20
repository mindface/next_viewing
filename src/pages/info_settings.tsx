import type { NextPage } from 'next'
import Head from 'next/head'
import SectionInfoSettings from '../components/SectionInfoSettings'

const About: NextPage = () => {
  return (
    <div className='about'>
      <Head>
        <title>about page</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <SectionInfoSettings />
    </div>
  )
}

export default About
