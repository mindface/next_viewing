import React, { useEffect } from 'react'
import { useStore, useDispatch } from 'react-redux'
import { getFetchLogs } from '../store/logtools/slice'
import Link from 'next/link'

function SectionAbout() {
  const dispatch = useDispatch()

  const projectArray = [
    {title:'github',url:'https://github.com/mindface?tab=repositories'},
    {title:'blog',url:'https://thinkbrainer.blogspot.com/'},
  ]

  useEffect(() => {
    dispatch(getFetchLogs())
  }, [])

  return (
    <section className='l-section section--about'>
      <div className='content __limit-m'>
        <div className='content__title'>
          <h3 className='title'>About projects</h3>
        </div>
        <div className='content__body'>
          <div className="struct-model">
            <div className="struct-model__title">Project reed</div>
          </div>
          <ul className="list">
            {projectArray.map((item:{title:string,url:string}) => (
              <li className="item">
                  <h4 className="item__title">{item.title}</h4>
                  <div className="item__disc">
                    <Link href={item.url} >
                      <a className='link' target="_new">
                        {item.url}
                      </a>
                    </Link>
                  </div>
                </li>
             ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default SectionAbout
