import React, { useEffect } from 'react'
import { useStore, useDispatch } from 'react-redux'
import { getFetchLogs } from '../store/logtools/slice'

function SectionAbout() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getFetchLogs())
  }, [])

  return (
    <section className='l-section section--about'>
      <div className='content'>
        <div className='content__title'>
          <h3 className='titile'>About</h3>
        </div>
        <div className='content__body'>
          <div className='text'>about me</div>
        </div>
      </div>
    </section>
  )
}

export default SectionAbout
