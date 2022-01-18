import React, { useEffect, useRef } from 'react'
import { useStore, useDispatch, useSelector } from 'react-redux'
import { getFetchUser, postAuthFetchUser } from '../store/user/slice'

function SectionLogin() {
  const dispatch = useDispatch()
  const name = useRef('')
  const pass = useRef('')

  useEffect(() => {
    dispatch(getFetchUser())
  }, [])

  function sendData() {
    dispatch(postAuthFetchUser(name.current, pass.current))
  }

  return (
    <section className='l-section section--login __boxshadow __radius'>
      <div className='loginForm-box'>
        <div className='login-form'>
          <p className='field __p-1'>
            <label htmlFor='name' className='label _d_b_ __p-b-8'>
              ネーム -
            </label>
            <input
              type='text'
              id='name'
              className='input'
              onChange={(e) => {
                name.current = e.target.value
              }}
            />
          </p>
          <p className='field __p-1'>
            <label htmlFor='pass' className='label _d_b_ __p-b-8'>
              パスワード -
            </label>
            <input
              type='text'
              id='name'
              className='input'
              onChange={(e) => {
                pass.current = e.target.value
              }}
            />
          </p>
          <p className='field __p-1'>
            <input
              type='submit'
              id='name'
              className='__btn __btn--primary'
              value='送信'
              onClick={sendData}
            />
          </p>
        </div>
      </div>
    </section>
  )
}

export default SectionLogin
