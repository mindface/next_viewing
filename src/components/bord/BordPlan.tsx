import React, { useRef, useState, useEffect } from 'react'
import { useStore, useSelector, useDispatch } from 'react-redux'
import { BaseTask } from "../../models/baseTask";
import { TaskLimit } from "../../models/TaskLimit";
import Image from "next/image";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction"
import { getFetchTaskLimits, createFetchTaskLimit, updateFetchTaskLimit, deleteFetchTaskLimit } from "../../store/taskLimit/slice";
import CommonModal, { Handler } from "../common/CommonModal";

function BordPlan() {
  const store = useStore()
  const plans = useSelector(() => store.getState().taskLimit.taskLimit)
  const tasks = useSelector(() => store.getState().baseTask.baseTasks)
  const dispatch = useDispatch()
  const [title,setTitle] = useState('タスクを選んでください')
  const [disc,setDisc] = useState('')
  const [taskId,setTaskId] = useState(0)
  const [startTime,setStartTime] = useState('')
  const [endTime,setEndTime] = useState('')
  const [viewId,setViewId] = useState(0)
  const [viewType,setViewType] = useState('new')
  const [viewClock01,setViewClock01] = useState(false)
  const [viewClock02,setViewClock02] = useState(false)
  const [viewSelect,setViewSelect] = useState(false)

  const inputStartTime = useRef<HTMLInputElement>(null)
  const inputEndTime = useRef<HTMLInputElement>(null)

  const modalRef = useRef({} as Handler)

  const carendarAction = () => {}

  const createData = () => {
    const sendData = {
      title: title,
      disc_content: disc,
      start_time: startTime,
      end_time: endTime,
      task_id: taskId,
    }
    dispatch(createFetchTaskLimit(sendData))
    modalRef.current.modalAction()
  }

  const updateData = () => {
    const sendData = {
      id: viewId,
      title: title,
      disc_content: disc,
      start_time: startTime,
      end_time: endTime,
      task_id: taskId,
    }
    dispatch(updateFetchTaskLimit(sendData))
    modalRef.current.modalAction()
  }

  const deleteData = () => {
    if(confirm('この動作は戻すことができません')){
      dispatch(deleteFetchTaskLimit(viewId))
      modalRef.current.modalAction()
    }
  }

  useEffect(() => {
    dispatch(getFetchTaskLimits())
  },[])

  const viewData = (item:TaskLimit) => {
    modalRef.current.modalAction()
    setViewType('edit')
    setTitle(item.title)
    setDisc(item.disc_content)
    setStartTime(item.start_time)
    setEndTime(item.end_time)
    setViewId(Number(item.id))
  }

  const resetData = () => {
    setViewType('new')
    setTitle('タスクを選んでください')
    setDisc('')
    setStartTime('')
    setEndTime('')
  }

  const setday = (e:any,type:string) => {
    switch (type) {
      case 'start':
        setStartTime(e.dateStr)
        setViewClock01(!viewClock01)
        break;
      case 'end':
        setEndTime(e.dateStr)
        setViewClock02(!viewClock02)
        break;
    }
  }

  return (
    <div className="box-task bord bord--plan">
      <CommonModal type={viewType} setMethods={resetData} ref={modalRef} >
        <div className="add-task">
          { viewType === 'edit' ? <button className="btn delete" onClick={e => deleteData()}>delete</button> : '' }
          <div className="add-task__header">
            <h3 className="m-title">計画の新規追加</h3>
          </div>
          <div className="task-from">
            <div className="task-from__field">
              <p className="label" onClick={(e) => setViewSelect(true)}>{title}</p>
              {viewSelect && 
                <div className="box-select">
                  { tasks.length && <p>nodata</p> }
                  { tasks.map( (item:BaseTask) => {
                    return (<div className="select" key={item.id} onClick={(e) => { setTitle(item.title); setTaskId(Number(item.id)); setViewSelect(false); }}>{item.title}</div>)
                  })}
                </div> }
            </div>
            <div className="task-from__field">
              <label htmlFor="disc" className="label">詳細</label>
              <textarea name="disc" id="disc" className="textarea" defaultValue={disc} onChange={(e) => {setDisc(e.target.value)}}></textarea>
            </div>
            <div className="task-from__field">
              <label htmlFor="startTime" className="label">開始時間
              <Image
                src="/images/clock.svg"
                alt="clock svg"
                width={15}
                height={15}
                onClick={() => setViewClock01(!viewClock01)}
              />
              </label>
              {viewClock01 &&
                <div className="calendar-box">
                  <FullCalendar
                    plugins={[dayGridPlugin,interactionPlugin]}
                    locale="ja"
                    initialEvents={[{ title: 'initial event', start: new Date() }]}
                    dateClick={(e) => {setday(e,'start')}}
                  />
                </div>}
              <input type="text" ref={inputStartTime} className="input" name="startTime" id="startTime" value={startTime} onClick={() => setViewClock01(!viewClock01)} onChange={(e) => {setStartTime(e.target.value)}} />
            </div>
            <div className="task-from__field">
              <label htmlFor="endTime" className="label">終了時間
                <Image
                  src="/images/clock.svg"
                  alt="clock svg"
                  width={15}
                  height={15}
                  onClick={() => setViewClock02(!viewClock02)}
                />
              </label>
              {viewClock02 &&
                <div className="calendar-box">
                  <FullCalendar
                    plugins={[dayGridPlugin,interactionPlugin]}
                    locale="ja"
                    initialEvents={[{ title: 'initial event', start: new Date() }]}
                    dateClick={(e) => {setday(e,'end')}}
                  />
                </div>}
              <input type="text" ref={inputEndTime} className="input" name="endTime" id="endTime" value={endTime} onClick={() => setViewClock02(!viewClock02)} onChange={(e) => {setEndTime(e.target.value)}} />
            </div>
            <div className="task-from__field">
              {viewType === 'new' ? <input type="submit" className="input" value="追加" onClick={createData} /> : <input type="submit" className="input" value="更新" onClick={updateData} />}
            </div>
          </div>
        </div>
      </CommonModal>
      <div className="box-task__title">
        <h3 className="title">タスクの計画 | 期限</h3>
      </div>
      <div className="box-task__body">
        <ul className="list">
          {plans.length === 0 ? <li className="item">nodata</li>
          : plans.map( (item:TaskLimit) => {
              return (<li className="item _flex_s_b_" key={`plans${item.id}`} onClick={(e) => {viewData(item)}}>
                  <p className="caption">{item.title}</p>
                  <div className="times _flex_">
                    <p className="start_time">{item.start_time}</p>
                    <span className="aid">~</span>
                    <p className="end_time">{item.end_time}</p>
                  </div>
                </li>
              )
            })}
        </ul>
      </div>
    </div>
  )
}

export default BordPlan
