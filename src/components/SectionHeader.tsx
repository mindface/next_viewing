import React, { useEffect, useRef } from 'react'
import { useStore, useDispatch } from 'react-redux'
import { getFetchLogs, createFetchLogs } from '../store/logtools/slice'

function SectionDashbord() {
  const dispatch = useDispatch()
  // const store = useStore()
  const title = useRef('lll')
  const sub_content = useRef('')
  const achieve_content = useRef('')
  const content = useRef('')
  const clear_item = useRef('')
  const play_item = useRef('')

  function AddSetAction(value: string, sendValue: string) {
    switch (value) {
      case 'title':
        title.current = sendValue
        break
      case 'sub_content':
        sub_content.current = sendValue
        break
      case 'achieve_content':
        achieve_content.current = sendValue
        break
      case 'content':
        content.current = sendValue
        break
      case 'play_item':
        play_item.current = sendValue
        break
      case 'clear_item':
        clear_item.current = sendValue
        break
    }
  }

  function SendAction() {
    const send_data = {
      title: title.current,
      sub_content: sub_content.current,
      achieve_content: achieve_content.current,
      content: content.current,
      play_item: Number(play_item.current),
      clear_item: Number(clear_item.current),
    }
    dispatch(createFetchLogs(send_data))
  }

  useEffect(() => {
    dispatch(getFetchLogs())
  }, [])

  return (
    <section className='section--header'>
      <form>
        <p className='field'>
          title:
          <input type='text' onChange={(e) => AddSetAction('title', e.target.value)} />
        </p>
        <p className='field'>
          sub_content:
          <input type='text' onChange={(e) => AddSetAction('sub_content', e.target.value)} />
        </p>
        <p className='field'>
          achieve_content:
          <input type='text' onChange={(e) => AddSetAction('achieve_content', e.target.value)} />
        </p>
        <p className='field'>
          content:
          <input type='text' onChange={(e) => AddSetAction('content', e.target.value)} />
        </p>
        <p className='field'>
          play_item:
          <input type='number' onChange={(e) => AddSetAction('play_item', e.target.value)} />
        </p>
        <p className='field'>
          clear_item:
          <input type='number' onChange={(e) => AddSetAction('clear_item', e.target.value)} />
        </p>
        <p className='field'>
          送信:
          <input
            type='submit'
            onClick={(e) => {
              e.preventDefault()
              SendAction()
            }}
          />
        </p>
      </form>
    </section>
  )
}

export default SectionDashbord
