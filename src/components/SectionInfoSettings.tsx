import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useStore, useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { BaseTask } from '../models/baseTask'
import { getFetchBaseTasks } from '../store/baseTask/slice'
import { searchData } from '../store/logtools/slice'
import { createFetchStructuralPat } from '../store/structuralPattern/slice'
import { cardArray } from '../utils/make-struct-array'
import CommonModal, { Handler } from './common/CommonModal'

function SectionMakeStructure() {
  const router = useRouter()
  const dispatch = useDispatch()
  const store = useStore()
  const tasks = useSelector(() => store.getState().baseTask.baseTasks)
  const [seleniumText, setSeleniumText] = useState('')

  useEffect(() => {
    dispatch(getFetchBaseTasks())
  }, [])

  const sendAction = () => {
    dispatch(searchData(seleniumText))
  }

  return (
    <section className='l-section section--make-structure make-structure _flex_c_'>
      <div className='content __limit-w-l'>
        <div className='content__title'>
          <h3 className='title'>テキストの変更</h3>
        </div>
        <div className="content__from">
          <label htmlFor="textText" className="label"></label>
          <input id="textText" type="text" defaultValue={seleniumText} onChange={(e:ChangeEvent) => {
            const element = e.target as HTMLInputElement;
            setSeleniumText(element.value)
          }} />
          <input type="submit" value="送信" onClick={sendAction} />
        </div>
      </div>
    </section>
  )
}

export default SectionMakeStructure
