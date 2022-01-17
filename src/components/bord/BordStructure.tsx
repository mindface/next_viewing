import React, { useRef, useState, useEffect } from 'react'
import { useStore, useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import { StructuralPattern, StructuralItem } from "../../models/StructuralPattern";
import CommonModal, {Handler} from "../common/CommonModal";
import { getFetchStructuralPats, deleteFetchStructuralPat } from "../../store/structuralPattern/slice";

function BordStructure() {
  const store = useStore()
  const dispatch = useDispatch()
  const structuralPats = useSelector(() => store.getState().structuralPat.structuralPats)
  const [title,setTitle] = useState('')
  const [disc,setDisc] = useState('')
  const structurals = useRef([])
  const [viewId,setViewId] = useState(0)
  const [pattern,setPattern] = useState('')
  const [taskId,setTaskId] = useState(0)
  const [viewType,setViewType] = useState('nobtn')

  const modalRef = useRef({} as Handler)

  useEffect(() => {
    dispatch(getFetchStructuralPats())
  },[])

  const deleteData = () => {
    if(confirm('この作業は取り消すことはできません。削除しますか。')){
      dispatch(deleteFetchStructuralPat(viewId))
      modalRef.current.modalAction()
    }
  }

  const viewAtion = (item:StructuralPattern) => {
    modalRef.current.modalAction()
    setViewId(item.id)
    setTitle(item.title)
    setDisc(item.disc_content)
    structurals.current = JSON.parse(item.structural)
  }

  const resetData = () => {
    setTitle('タスクを選んでください')
    setDisc('')
    setTaskId(0)
  }

  return (
    <div className="box-task bord bord--structure">
      <div className="box-task__title">
        <h3 className="title">構造のパタン</h3>
        <CommonModal type={viewType} setMethods={resetData} ref={modalRef} >
          <button className="btn delete" onClick={e => deleteData()}>delete</button>
          <div className="modal-view">
            <div className="modal-view__links">
               <Link href="/structures">
                 <a className='link'>
                  一覧
                  <Image
                    src='/images/disc-view.svg'
                    alt="add svg"
                    width={15}
                    height={15}
                  />
                 </a>
               </Link>
               <Link href="/make_structure">
                 <a className='link'>
                   構成モデル作成
                  <Image
                    src='/images/make-struct.svg'
                    alt="add svg"
                    width={15}
                    height={15}
                  />
                 </a>
               </Link>
            </div>
            <h3 className="modal-view__title">{title}</h3>
            <div className="modal-view__content">{disc}</div>
            <div className="structures _flex_">
            {structurals.current.map((item:StructuralItem) => {
              return (
                <div className="structure" key={item.selectId}>
                  <div className="item __radius __boxshadow" key={item.id} dangerouslySetInnerHTML={{__html: item.content}}></div>
                </div>
              )
            })}
          </div>
          </div>
        </CommonModal>
      </div>
      <div className="box-task__body">
        <ul className="list">
          {structuralPats.map((item:StructuralPattern) => {
          return (<li className="item" key={item.id} onClick={() => viewAtion(item)}>
              <p className="caption">{item.title}</p>
              <p className="img-area"></p>
            </li>)
          })}
        </ul>
      </div>
    </div>
  )
}

export default BordStructure
