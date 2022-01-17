import React, { useEffect, useRef, useState } from 'react'
import { useStore ,useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { BaseTask } from "../models/baseTask";
import { getFetchBaseTasks } from "../store/baseTask/slice";
import { createFetchStructuralPat } from "../store/structuralPattern/slice";
import { cardArray } from '../utils/make-struct-array'
import CommonModal, {Handler} from "./common/CommonModal";

function SectionMakeStructure() {
  const router = useRouter()
  const dispatch = useDispatch()
  const store = useStore()
  const tasks = useSelector(() => store.getState().baseTask.baseTasks)
  const [title,setTitle] = useState('')
  const [disc,setDisc] = useState('')
  const [pattern,setPattern] = useState('')
  const [taskTitle,setTaskTitle] = useState('タスクを選んでください。')
  const [taskId,setTaskId] = useState(0)
  const [taskSelect,setTaskSelect] = useState(false)
  const modalRef = useRef({} as Handler)
  const [selectItem,setSelectItem] = useState("")
  const [makeStruct,setMakeStruct] = useState([
    cardArray[0],
    cardArray[1]
  ])
  const structDom = useRef<HTMLDivElement>(null)
  const [viewType,setViewType] = useState('new')

  useEffect(() => {
    dispatch(getFetchBaseTasks())
  },[])

  const selectTask = (id:number,title:string) => {
    setTaskId(id)
    setTaskTitle(title)
    setTaskSelect(false)
  }

  const AddItem = () => {
    if(selectItem !== '') {
      let items:{id:number,selectId:string,content:any}[] = []
      makeStruct.forEach(item => {
        items.push(item)
      })
      items.push({id:Number(makeStruct.length+1),selectId:`select0${makeStruct.length+1}`,content:selectItem})
      setMakeStruct(items)
    }else {
      alert('追加するパーツを選んでください。')
    }
  }

  const removeItem = (id:number) => {
    const items = makeStruct.filter((item) => item.id !== id)
    setMakeStruct(items)
  }

  const createData = () => {
    const structHTML = structDom.current?.innerHTML
    const sendData = {
      title: title,
      disc_content: disc,
      task_id: taskId,
      structural: String(structHTML),
      pattern: 'pattern',
    }
    dispatch(createFetchStructuralPat(sendData))
    modalRef.current.modalAction()
    router.push('structures')
  }

  return (
    <section className="l-section section--make-structure make-structure _flex_c_">
      <div className="content __limit-w-l">
        <CommonModal type={viewType} ref={modalRef} >
          <div className="add-task">
            <div className="add-task__header">
              <h3 className="m-title">前提の新規追加</h3>
            </div>
            <div className="task-from">
              <div className="task-from__field">
                <p className="task-name" onClick={() => setTaskSelect(!taskSelect)}>{taskTitle}</p>
                { taskSelect && <div className="task-select">{tasks.map((item:BaseTask) => (<div className='task' key={Number(item.id)} onClick={() => selectTask(Number(item.id),item.title)}>{item.title}</div>))}</div> }
                <label htmlFor="title" className="label">構造名</label>
                <input type="text" className='input' name="title" id="title" defaultValue={title} onChange={(e) => {setTitle(e.target.value)}} />
              </div>
              <div className="task-from__field">
                <label htmlFor="disc" className="label">詳細</label>
                <textarea name="disc" id="disc" className='textarea' defaultValue={disc} onChange={(e) => {setDisc(e.target.value)}}></textarea>
              </div>
              <div className="task-from__field">
                <label htmlFor="taskId" className="label">パターンモデル</label>
                <input type="test" className='input' name="taskId" id="taskId" defaultValue={pattern} onChange={(e) => {setPattern(e.target.value)}} />
              </div>
              <div className="task-from__field">
                <input type="submit" className="input" value="追加" onClick={createData} />
              </div>
            </div>
          </div>
        </CommonModal>
        <div className="content__top">
          <button className="btn __radius __boxshadow" onClick={e => modalRef.current.modalAction()} >保存</button>
        </div>
        <div className="content__title">
          <h3 className="title">構造を作成</h3>
        </div>
        <div className="content__body">
          <div className="structures _flex_" ref={structDom}>
            {makeStruct.map((item:any) => {
              return (
                <div className="structure" key={item.selectId}>
                  <span className="aid __radius __boxshadow" onClick={() => {removeItem(item.id)}}>x</span>
                  <div className="item __radius __boxshadow" key={item.id} dangerouslySetInnerHTML={{__html: item.content}}></div>
                </div>
              )
            })}
          </div>
        </div>
        <div className="content__selects">
          <div className="selects__title">
            <h3 className="title">追加カード</h3>
          </div>
          <div className="selects__items _flex_">
            {cardArray.map((item) => {
              return (<div key={`cardArray${item.selectId}`}><input type="radio" name="selectItem" id={item.selectId} className="input"  onChange={()  => setSelectItem(item.content)} />
              <label htmlFor={item.selectId} className="label">
                <div className="item __radius __boxshadow" dangerouslySetInnerHTML={{__html:item.content}}></div>
              </label></div>)
            })}
          </div>
          <button className="btn __radius __boxshadow" onClick={() => AddItem()}>追加</button>
        </div>
      </div>
    </section>
  )
}

export default SectionMakeStructure
