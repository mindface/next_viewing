import React, { useRef, useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { useStore, useDispatch, useSelector } from 'react-redux'
import { getFetchBaseTasks } from '../../store/baseTask/slice'
import { BaseTask, AddBaseTask } from '../../models/baseTask'
import CommonModal, { Handler } from '../common/CommonModal'
import {
  getFetchBaseTask,
  updateFetchBaseTask,
  deleteFetchBaseTask,
  createFetchBaseTask,
} from '../../store/baseTask/slice'
const ReactQuill = dynamic(import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
})
import 'react-quill/dist/quill.snow.css'

function BordTask() {
  const store = useStore()
  const dispatch = useDispatch()
  const tasks = useSelector(() => store.getState().baseTask.baseTasks)
  const [title, setTitle] = useState('')
  const [disc, setDisc] = useState('')
  const [username, setUsername] = useState('')
  const [playItem, setPlayItem] = useState(0)
  const [clearItem, setClearItem] = useState(0)
  const [taskId, setTaskId] = useState('')
  const [viewId, setViewId] = useState(0)
  const modalRef = useRef({} as Handler)

  const [viewSwitch, setViewSwitch] = useState(false)
  const [viewType, setViewType] = useState('new')

  const quillRef = useRef('')

  const saveToFile = (file: File) => {
    const form_data = new FormData()
    form_data.append('image', file)
    form_data.append('caption', '画像ファイル')
    form_data.append('image_id', 'dddd')

    var xhr = new XMLHttpRequest()
    // xhr.open("POST",'http://localhost:3003/api/v1/make_image', true);
    xhr.open('POST', 'http://localhost:8008/logtool/make_image', true)
    xhr.onload = function (e) {
      if (xhr.readyState === 4 && xhr.status === 200) {
        // const data = JSON.parse(this.response)
        // const range = editorRef.current?.getEditor()
        // range.insertEmbed(range.index,"image",`http://localhost:8008/${data.file_name}`)
        document.execCommand(
          'insertHTML',
          false,
          '<img alt="画像文字列" src=`http://localhost:8008/${data.file_name}` />',
        )
      }
    }
    xhr.onerror = function (e) {
      console.error(xhr.statusText)
    }
    xhr.send(form_data)

    return false
  }

  const imager = () => {
    const input = document.createElement('input') as HTMLInputElement
    input.setAttribute('type', 'file')
    input.setAttribute('accept', 'iamge/*')
    input.click()

    input.onchange = () => {
      if (input.files !== null && /^image\//.test(input.files[0].type)) {
        const file = input.files[0]
        saveToFile(file)
      } else {
        console.warn('画像のみをアップロードできます。')
      }
    }
  }

  const modules = {
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ script: 'sub' }, { script: 'super' }],
        [{ indent: '-1' }, { indent: '+1' }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ color: [] }, { background: [] }],
        [{ font: [] }],
        [{ align: [] }],
        ['clean'],
        ['link', 'image'],
      ],
      handlers: {
        image: imager,
      },
    },
  }

  const formats = [
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'color',
    'background',
    'script',
    'header',
    'blockquote',
    'code-block',
    'indent',
    'list',
    'direction',
    'align',
    'link',
    'image',
    'video',
    'formula',
  ]

  useEffect(() => {
    dispatch(getFetchBaseTasks())
  }, [])

  const createData = () => {
    const sendData = {
      title: title,
      disc_content: quillRef.current,
      user_name: username,
      play_item: Number(playItem),
      clear_item: Number(clearItem),
    }
    dispatch(createFetchBaseTask(sendData))
    modalRef.current.modalAction()
  }

  const updateData = () => {
    const sendData = {
      id: viewId,
      title: title,
      disc_content: quillRef.current,
      user_name: username,
      play_item: Number(playItem),
      clear_item: Number(clearItem),
    }
    dispatch(updateFetchBaseTask(sendData))
    modalRef.current.modalAction()
  }

  const deleteData = () => {
    if (confirm('この動作は戻すことができません')) {
      dispatch(deleteFetchBaseTask(Number(viewId)))
      modalRef.current.modalAction()
    }
  }

  const viewItem = async (item: BaseTask) => {
    modalRef.current.modalAction()
    setViewType('edit')
    setTitle(item.title)
    setDisc(item.disc_content)
    setUsername(item.user_name)
    setPlayItem(item.play_item)
    setClearItem(item.clear_item)
    setViewId(Number(item.id))
    const editor = document.querySelector('#react-quill [contenteditable="true"]')
    console.log(editor)
  }

  const resetData = () => {
    setViewType('new')
    setTitle('')
    setDisc('')
    setUsername('')
    setPlayItem(0)
    setClearItem(0)
  }

  const removeHtmlText = (data: string): string => {
    const text = data.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, '')
    return text.substr(0, 180)
  }

  return (
    <div className='box-task bord bord--task'>
      <CommonModal type={viewType} setMethods={resetData} ref={modalRef}>
        {viewType === 'edit' ? (
          <button className='btn delete' onClick={(e) => deleteData()}>
            delete
          </button>
        ) : (
          ''
        )}
        <div className='add-task'>
          <div className='add-task__header'>
            <h3 className='m-title'>タスクの新規追加</h3>
          </div>
          <div className='task-from'>
            <div className='task-from__field'>
              <label htmlFor='title' className='label'>
                タスクネーム
              </label>
              <input
                type='text'
                className='input'
                name='title'
                id='title'
                defaultValue={title}
                onChange={(e) => {
                  setTitle(e.target.value)
                }}
              />
            </div>
            <div className='task-from__field'>
              <label htmlFor='disc' className='label'>
                詳細
              </label>
              <ReactQuill
                id='react-quill'
                modules={modules}
                formats={formats}
                theme='snow'
                defaultValue={disc}
                onChange={(value: string) => {
                  quillRef.current = value
                }}
              />
            </div>
            <div className='task-from__field'>
              <label htmlFor='username' className='label'>
                ユーザー名
              </label>
              <input
                type='text'
                className='input'
                name='username'
                id='username'
                defaultValue={username}
                onChange={(e) => {
                  setUsername(e.target.value)
                }}
              />
            </div>
            <div className='task-from__field'>
              <label htmlFor='play_item' className='label'>
                実行数
              </label>
              <input
                type='number'
                className='input'
                name='play_item'
                id='play_item'
                defaultValue={playItem}
                onChange={(e) => {
                  setPlayItem(Number(e.target.value))
                }}
              />
            </div>
            <div className='task-from__field'>
              <label htmlFor='clear_item' className='label'>
                達成率
              </label>
              <input
                type='number'
                className='input'
                name='clear_item'
                id='clear_item'
                defaultValue={clearItem}
                onChange={(e) => {
                  setClearItem(Number(e.target.value))
                }}
              />
            </div>
            <div className='task-from__field'>
              {viewType === 'new' ? (
                <input type='submit' className='input' value='追加' onClick={createData} />
              ) : (
                <input type='submit' className='input' value='更新' onClick={updateData} />
              )}
            </div>
          </div>
        </div>
      </CommonModal>
      <div className='box-task__title _flex_'>
        <h3 className='title'>タスク詳細</h3>
      </div>
      <div className='box-task__body'>
        <ul className='list'>
          {tasks.map((item: BaseTask, index: number) => {
            return (
              <li className='item' key={index} onClick={(e) => viewItem(item)}>
                <p className='caption'>{item.title}</p>
                <p className='disc'>{removeHtmlText(item.disc_content)}</p>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default BordTask
