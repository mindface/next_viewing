import React, { useEffect } from 'react'
import Link from 'next/link'
import { useStore, useDispatch, useSelector } from 'react-redux'
import { resetUser } from '../store/user/slice'

interface propsType {
  title: string
}

function IndexHeader(props: propsType) {
  const dispatch = useDispatch()
  const store = useStore()
  const token = useSelector(() => store.getState().user.user_token)

  const links = [
    { id: 1, path: '/dashbord', text: 'home' },
    { id: 2, path: '/about', text: 'about' },
    { id: 3, path: '/structures', text: 'structures' },
  ]

  function logoutAction() {
    dispatch(resetUser())
  }

  return (
    <header className='index-header'>
      <div className='header--body _flex_s_b_'>
        <Link href='/dashbord'>
          <a>
            <h1 className='header__title'>{props.title}</h1>
          </a>
        </Link>
        {token === '' && <p>token</p>}

        <nav className='g-nav'>
          <ul className='list _flex_'>
            {links.map((item) => (
              <li className='item' key={item.id}>
                <Link href={item.path}>
                  <a className='link'>{item.text}</a>
                </Link>
              </li>
            ))}
            <li className='item'>
              <p className='link' onClick={logoutAction}>
                logout
              </p>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default IndexHeader
