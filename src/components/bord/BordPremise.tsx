import React, { useEffect, useRef, useState } from 'react'
import { useStore, useSelector, useDispatch } from 'react-redux'
import { getFetchTaskPremise, createFetchTaskPremise, getFetchTaskPremiseDisc, updateFetchTaskPremise, deleteFetchTaskPremise } from "../../store/taskPremise/slice";
import { TaskPremise } from "../../models/TaskPremise";
import CommonModal, { Handler } from "../common/CommonModal";

function BordPremise() {
  const store = useStore()
  const dispatch = useDispatch()
  const premise = useSelector(() => store.getState().taskPremise.taskPremise)
  const [title,setTitle] = useState('')
  const [disc,setDisc] = useState('')
  const [taskId,setTaskId] = useState(0)
  const [viewId,setViewId] = useState(0)
  const [viewType,setViewType] = useState('new')

  const [viewSwitch,setViewSwitch] = useState(false)

  const modalRef = useRef({} as Handler)

  useEffect(() => {
    dispatch(getFetchTaskPremise())
  },[])

  const createData = () => {
    const sendData = {
      title: title,
      disc_content: disc,
      task_id: Number(taskId),
    }
    dispatch(createFetchTaskPremise(sendData))
    modalRef.current.modalAction()
  }

  const updateData = () => {
    const sendData = {
      id: viewId,
      title: title,
      disc_content: disc,
      task_id: Number(taskId),
    }
    dispatch(updateFetchTaskPremise(sendData))
    modalRef.current.modalAction()
  }

  const deleteData = () => {
    if(confirm('この動作は戻すことができません')){
      dispatch(deleteFetchTaskPremise(Number(viewId)))
      modalRef.current.modalAction()
    }
  }

  const viewItem = (item:TaskPremise) => {
    modalRef.current.modalAction()
    setViewType('edit')
    setViewSwitch(true)
    setTitle(item.title)
    setDisc(item.disc_content)
    setTaskId(item.task_id)
    setViewId(item.id)
  }

  const resetData = () => {
    setViewType('new')
    setTitle('タスクを選んでください')
    setDisc('')
    setTaskId(0)
  }

  return (
    <div className="box-task bord bord--premise">
      { viewType === 'edit' ? <button className="btn delete" onClick={e => deleteData()}>delete</button> : '' }
      <div className="box-task__title">
        <h3 className="title">前提として単位</h3>
        <CommonModal type={viewType} setMethods={resetData} ref={modalRef} >
          { viewType === 'edit' ? <button className="btn delete" onClick={e => deleteData()}>delete</button> : '' }
          <div className="add-task">
            <div className="add-task__header">
              <h3 className="m-title">前提の新規追加</h3>
            </div>
            <div className="task-from">
              <div className="task-from__field">
                <label htmlFor="title" className="label">タスクネーム</label>
                <input type="text" className='input' name="title" id="title" defaultValue={title} onChange={(e) => {setTitle(e.target.value)}} />
              </div>
              <div className="task-from__field">
                <label htmlFor="disc" className="label">詳細</label>
                <textarea name="disc" id="disc" className='textarea' defaultValue={disc} onChange={(e) => {setDisc(e.target.value)}}></textarea>
              </div>
              <div className="task-from__field">
                <label htmlFor="play_item" className="label">対象タスク</label>
                <input type="number" className='input' name="play_item" id="defaultValue={disc} " defaultValue={disc} onChange={(e) => {setTaskId(Number(e.target.value))}} />
              </div>
              <div className="task-from__field">
                {viewType === 'new' ? <input type="submit" className="input" value="追加" onClick={createData} /> : <input type="submit" className="input" value="更新" onClick={updateData} />}
              </div>
            </div>
          </div>
        </CommonModal>
      </div>
      <div className="box-task__body">
        <ul className="list">
          {premise.map((item:TaskPremise) => {
            return (
              <li className="item" key={item.id} onClick={(e) => viewItem(item)}>
                <p className="caption">{item.title}</p>
                <p className="text">{item.disc_content}</p>
              </li>)
          })}
        </ul>
      </div>
    </div>
  )
}

export default BordPremise
