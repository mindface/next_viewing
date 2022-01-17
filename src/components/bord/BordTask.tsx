import React, { useRef, useState, useEffect } from 'react'
import { useStore, useDispatch, useSelector } from "react-redux";
import { getFetchBaseTasks } from "../../store/baseTask/slice";
import { BaseTask, AddBaseTask } from "../../models/baseTask";
import CommonModal, {Handler} from "../common/CommonModal";
import { getFetchBaseTask, updateFetchBaseTask, deleteFetchBaseTask, createFetchBaseTask } from "../../store/baseTask/slice";

function BordTask() {
  const store = useStore()
  const dispatch = useDispatch()
  const tasks = useSelector(() => store.getState().baseTask.baseTasks)
  const [title,setTitle] = useState('')
  const [disc,setDisc] = useState('')
  const [username,setUsername] = useState('')
  const [playItem,setPlayItem] = useState(0)
  const [clearItem,setClearItem] = useState(0)
  const [taskId,setTaskId] = useState('')
  const [viewId,setViewId] = useState(0)
  const modalRef = useRef({} as Handler)

  const [viewSwitch,setViewSwitch] = useState(false)
  const [viewType,setViewType] = useState('new')

  useEffect(() => {
    dispatch(getFetchBaseTasks())
  },[])

  const createData = () => {
    const sendData = {
      title: title,
      disc_content: disc,
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
      disc_content: disc,
      user_name: username,
      play_item: Number(playItem),
      clear_item: Number(clearItem),
    }
    dispatch(updateFetchBaseTask(sendData))
    modalRef.current.modalAction()
  }


  const deleteData = () => {
    if(confirm('この動作は戻すことができません')){
      dispatch(deleteFetchBaseTask(Number(viewId)))
      modalRef.current.modalAction()
    }
  }

  const viewItem = async (item:BaseTask) => {
    modalRef.current.modalAction()
    setViewType('edit')
    setTitle(item.title)
    setDisc(item.disc_content)
    setUsername(item.user_name)
    setPlayItem(item.play_item)
    setClearItem(item.clear_item)
    setViewId(Number(item.id))
  }

  const resetData = () => {
    setViewType('new')
    setTitle('')
    setDisc('')
    setUsername('')
    setPlayItem(0)
    setClearItem(0)
  }

  return (
    <div className="box-task bord bord--task">
      <CommonModal type={viewType} setMethods={resetData} ref={modalRef} >
      { viewType === 'edit' ? <button className="btn delete" onClick={e => deleteData()}>delete</button> : '' }
        <div className="add-task">
          <div className="add-task__header">
            <h3 className="m-title">タスクの新規追加</h3>
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
              <label htmlFor="username" className="label">ユーザー名</label>
              <input type="text" className='input' name="username" id="username" defaultValue={username} onChange={(e) => {setUsername(e.target.value)}} />
            </div>
            <div className="task-from__field">
              <label htmlFor="play_item" className="label">実行数</label>
              <input type="number" className='input' name="play_item" id="play_item" defaultValue={playItem} onChange={(e) => {setPlayItem(Number(e.target.value))}} />
            </div>
            <div className="task-from__field">
              <label htmlFor="clear_item" className="label">達成率</label>
              <input type="number" className='input' name="clear_item" id="clear_item" defaultValue={clearItem} onChange={(e) => {setClearItem(Number(e.target.value))}} />
            </div>
            <div className="task-from__field">
              {viewType === 'new' ? <input type="submit" className="input" value="追加" onClick={createData} /> : <input type="submit" className="input" value="更新" onClick={updateData} />}
            </div>
          </div>
        </div>
      </CommonModal>
      <div className="box-task__title _flex_">
        <h3 className="title">タスク詳細</h3>
      </div>
      <div className="box-task__body">
        <ul className="list">
          {tasks.map((item:BaseTask,index:number) => {
            return (<li className="item" key={index} onClick={(e) => viewItem(item)}>
              <p className="caption">{item.title}</p>
              <p className="disc">{item.disc_content}</p>
            </li>)
          })}
        </ul>
      </div>
    </div>
  )
}

export default BordTask
