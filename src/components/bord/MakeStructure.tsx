import { iteratorSymbol } from 'immer/dist/internal'
import React, { useRef, useState, useEffect } from 'react'
import { useStore, useDispatch, useSelector } from 'react-redux'
import { SortablePane, Pane } from 'react-sortable-pane'
import Image from 'next/image'

function MakeStructure() {
  const store = useStore()
  const dispatch = useDispatch()
  const structuralPats = useSelector(() => store.getState().structuralPat.structuralPats)
  const [title, setTitle] = useState('')

  const [viewSwitch, setViewSwitch] = useState(false)

  useEffect(() => {}, [])

  const createData = () => {}
  const updateData = () => {}
  const deleteData = () => {}

  const structuralAtion = () => {}

  const patternAtion = () => {}

  const resetData = () => {}

  const clickEvent = (e: MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
  }

  const dItems = [
    { id: 1, title: 'llll1', path: './sko', color: '#fff' },
    { id: 2, title: 'llll2', path: './sko', color: '#f00' },
    { id: 3, title: 'llll3', path: './sko', color: '#ff0' },
    { id: 4, title: 'llll4', path: './sko', color: '#ff0' },
  ]

  const panes = dItems.map((item) => (
    <Pane
      key={item.title}
      defaultSize={{ width: '100px', height: 120 }}
      issortable={false}
      onMouseDown={(e: any) => {
        e.stopPropagation()
        clickEvent(e)
      }}
    ></Pane>
  ))

  const onDragEnd = (e: any) => {}

  return (
    <div className='make-structure'>
      <div className='structure__title'>
        <h3 className='title'>構造の選択</h3>
      </div>
      <div className='structure__body'></div>
    </div>
  )
}

export default MakeStructure
