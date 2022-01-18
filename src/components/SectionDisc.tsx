import React, { useEffect } from 'react'
import { useStore, useDispatch, useSelector } from 'react-redux'
import { getFetchLogs } from '../store/logtools/slice'
import { getLogtoolsSelector } from '../store/selector/logstool'

function SectionAbout() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getFetchLogs())
  }, [])

  return (
    <section className='l-section section--disc'>
      <div className='content'>
        <div className='content__title'>
          <h3 className='titile'>SectionDisc</h3>
        </div>
        <div className='content__body'>
          <div className='text'>Section Disc</div>
        </div>
      </div>
    </section>
  )
}

export default SectionAbout
