import React, { useEffect, useRef, useState } from 'react'
import { useStore, useSelector, useDispatch } from 'react-redux'
import {
  getFetchTaskObjective,
  createFetchObjective,
  updateFetchObjective,
  deleteFetchObjective,
} from '../../store/taskObjective/slice'
import { TaskObjective, AddTaskObjective } from '../../models/TaskObjective'
import CommonModal, { Handler } from '../common/CommonModal'

function BordObjective() {
  const store = useStore()
  const dispatch = useDispatch()
  const ob = useSelector(() => store.getState().taskObjective.taskObjective)
  const [title, setTitle] = useState('')
  const [disc, setDisc] = useState('')
  const [lankId, setLankId] = useState(0)
  const [viewId, setViewId] = useState(0)
  const [viewType, setViewType] = useState('new')
  const modalRef = useRef({} as Handler)

  const createData = () => {
    const sendData = {
      title: title,
      disc_content: disc,
      lank_id: Number(lankId),
    }
    dispatch(createFetchObjective(sendData))
    modalRef.current.modalAction()
  }

  const updateData = () => {
    const sendData = {
      id: viewId,
      title: title,
      disc_content: disc,
      lank_id: Number(lankId),
    }
    dispatch(updateFetchObjective(sendData))
    modalRef.current.modalAction()
  }

  const deleteData = () => {
    if (confirm('この動作は戻すことができません')) {
      dispatch(deleteFetchObjective(Number(viewId)))
      modalRef.current.modalAction()
    }
  }

  useEffect(() => {
    dispatch(getFetchTaskObjective())
    getFetchTaskObjective()
  }, [])

  const viewData = (item: TaskObjective) => {
    modalRef.current.modalAction()
    setViewType('edit')
    setTitle(item.title)
    setDisc(item.disc_content)
    setLankId(item.lank_id)
    setViewId(Number(item.id))
  }

  const resetData = () => {
    setViewType('new')
    setTitle('')
    setDisc('')
    setLankId(0)
  }

  return (
    <div className='box-task bord bord--objective'>
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
            <h3 className='m-title'>優先順位の新規追加</h3>
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
              <textarea
                name='disc'
                id='disc'
                className='textarea'
                defaultValue={disc}
                onChange={(e) => {
                  setDisc(e.target.value)
                }}
              ></textarea>
            </div>
            <div className='task-from__field'>
              <label htmlFor='lankId' className='label'>
                優先度
              </label>
              <input
                type='number'
                className='input'
                name='lankId'
                id='clear_item'
                defaultValue={lankId}
                onChange={(e) => {
                  setLankId(Number(e.target.value))
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
      <div className='box-task__title'>
        <h3 className='title'>タスクの優先順位テキスト</h3>
      </div>
      <div className='box-task__body'>
        <ul className='list _flex_ __m-r-8'>
          {ob.map((item: TaskObjective) => {
            return (
              <li
                className='item __radius'
                key={item.id}
                onClick={(e) => {
                  viewData(item)
                }}
              >
                <p className='caption'>{item.title}</p>
                <p className='number'>No{item.lank_id}</p>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default BordObjective
