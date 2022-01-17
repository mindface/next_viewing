import React, { useEffect, useRef, useState } from 'react'
import { useStore ,useDispatch, useSelector } from 'react-redux'
import { getFetchBaseTasks } from '../store/baseTask/slice'
import { getFetchStructuralPats, updateFetchStructuralPat, deleteFetchStructuralPat } from '../store/structuralPattern/slice'
import { BaseTask } from "../models/baseTask";
import { StructuralPattern, StructuralItem } from "../models/StructuralPattern";
import CommonModal, {Handler} from "./common/CommonModal";
import Image from "next/image"
import Link from "next/link"


function SectionStructures() {
  const dispatch = useDispatch()
  const store = useStore()
  const structuralPats = useSelector(() => {
    const items = store.getState().structuralPat.structuralPats.map((item:StructuralPattern) => {
      if(hasJsonStruct(item.structural)){
        return {...item,structuralArry: JSON.parse(item.structural)}
      }
      return {...item,structuralArry: []}
    })
    return items
  })
  const tasks = useSelector(() => store.getState().baseTask.baseTasks)
  const [title,setTitle] = useState('')
  const [disc,setDisc] = useState('')
  const [pattern,setPattern] = useState('')
  const [taskTitle,setTaskTitle] = useState('タスクを選んでください。')
  const [taskSelect,setTaskSelect] = useState(false)
  const [structuralInfoId,setStructuralInfoId] = useState(0)
  const [structural,setStructural] = useState('')
  const [taskId,setTaskId] = useState(0)
  const modalRef = useRef({} as Handler)
  const [viewType,setViewType] = useState('edit')
  const structDom = useRef<HTMLDivElement>(null)

  useEffect(() => {
    dispatch(getFetchBaseTasks())
    dispatch(getFetchStructuralPats())
  },[])

  function hasJsonStruct(str:string){
    try {
      const result = JSON.parse(str)
      return Object.prototype.toString.call(result) === '[Object Object]' || Array.isArray(result)
    } catch (error) {
      return false
    }
  }

  const selectTask = (id:number,title:string) => {
    setTaskId(id)
    setTaskTitle(title)
    setTaskSelect(false)
  }

  function setView(item:StructuralPattern) {
    setStructuralInfoId(item.id)
    setTitle(item.title)
    setDisc(item.disc_content)
    setPattern(item.pattern)
    setTaskId(item.task_id)
    tasks.forEach((task:BaseTask) => {
      if(task.id === item.id){
        setTaskTitle(item.pattern)
      }
    });
  }

  const update = () => {
    const structHTML = structDom.current?.innerHTML
    const sendData = {
      id: structuralInfoId,
      title: title,
      disc_content: disc,
      user_name: 'demo',
      structural: String(structHTML),
      pattern: pattern,
      task_id: taskId,
    }
    dispatch(updateFetchStructuralPat(sendData))
    modalRef.current.modalAction()
  }

  const deleteData = () => {
    if(confirm('この作業は取り消すことはできません。削除しますか。')){
      dispatch(deleteFetchStructuralPat(structuralInfoId))
      modalRef.current.modalAction()
    }
  }

  return (
    <section className="l-section section--structure _flex_c_">
      <div className="content __limit-l">
        <div className="content__title _flex_">
          <h3 className="title">構造を一覧</h3>
        </div>
        <div className="content__bottom content__bottom--fixed">
          <Link href="/make_structure">
            <a className='link __btn __bg_white __radius __boxshadow'>
              <Image
                src='/images/make-struct.svg'
                alt="add svg"
                width={18}
                height={18}
              />
            </a>
          </Link>
        </div>
        <div className="content__body">
          {structuralPats.map((structuralInfo:(StructuralPattern)) => {
            return (
              <div className="struct __radius __boxshadow" key={structuralInfo.id}>
                <CommonModal type={viewType} setMethods={() => {setView(structuralInfo)}} ref={modalRef}>
                  <button className="btn delete" onClick={e => deleteData()}>delete</button>
                  <div className="add-task">
                    <div className="add-task__header">
                      <h3 className="m-title">前提の更新</h3>
                    </div>
                    <div className="task-from__field">
                      <label htmlFor="title" className="label">タイトル</label>
                      <input type="text" className='input' name="title" id="title" defaultValue={title} onChange={(e) => {setTitle(e.target.value)}} />
                    </div>
                    <div className="task-from__field">
                      <label htmlFor="disc" className="label">詳細</label>
                      <input type="text" className='input' name="disc" id="disc" defaultValue={disc} onChange={(e) => {setDisc(e.target.value)}} />
                    </div>
                    <div className="task-from">
                      <div className="task-from__field">
                        <p className="task-name" onClick={() => setTaskSelect(!taskSelect)}>{taskTitle}</p>
                        { taskSelect && <div className="task-select">{tasks.map((item:BaseTask) => (<div className='task' key={item.id} onClick={() => selectTask(Number(item.id),item.title)}>{item.title}</div>))}</div> }
                      </div>
                      <div className="task-from__field">
                        <label htmlFor="taskId" className="label">パターンモデル</label>
                        <input type="text" className='input' name="taskId" id="taskId" defaultValue={pattern} onChange={(e) => {setPattern(e.target.value)}} />
                      </div>
                      <div className="task-from__field">
                        <div className="struct__parts __p-t-32 _flex_" ref={structDom} dangerouslySetInnerHTML={{__html: structuralInfo.structural}}></div>
                      </div>
                      <div className="task-from__field">
                        <input type="submit" className="input" value="更新" onClick={update} />
                      </div>
                    </div>
                  </div>
                </CommonModal>
                <div className="struct__title">
                  <h3 className="title">{structuralInfo.title}</h3>
                </div>
                <div className="struct__disc">{structuralInfo.disc_content}</div>
              </div>
            )
          })}
        </div> 
      </div>
    </section>
  )
}

export default SectionStructures
