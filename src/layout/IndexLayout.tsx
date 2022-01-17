import * as React from 'react'
import Head from 'next/head'
import IndexHeader from '../components/IndexHeader'
import IndexFooter from '../components/IndexFooter'
import { useRouter, RouterEvent } from 'next/router';
import { useStore ,useDispatch, useSelector } from 'react-redux'

type Props = {
  children?: React.ReactNode
  title?: string,
  header_category?: string,
}

export default function IndexLayout ({
  children,
  title = 'info reed',
  header_category = 'info reed',
}:Props) {
  const router = useRouter()
  const store = useStore()
  const user = useSelector(() => store.getState().user)

  React.useEffect(() => {
  },[])

  return (
      <>
        <Head>
          <title>{title}</title>
          <meta charSet="utf=8" />
        </Head>
        <div className='wrapper'>
          <div className="page-container">
            <IndexHeader title={header_category}/>
            {children}
            <IndexFooter title="&copy; realize" />
          </div>
        </div>
      </>
    )
}
