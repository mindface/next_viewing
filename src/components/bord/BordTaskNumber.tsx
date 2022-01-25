import React from 'react'
import { useStore, useSelector, useDispatch } from 'react-redux'

function BordTaskNumber() {
  const store = useStore()
  const ob = useSelector(() => store.getState().taskObjective.taskObjective)
  const plans = useSelector(() => store.getState().taskLimit.taskLimit)
  const tasks = useSelector(() => store.getState().baseTask.baseTasks)
  const premise = useSelector(() => store.getState().taskPremise.taskPremise)
  const structuralPats = useSelector(() => store.getState().structuralPat.structuralPats)

  return (
    <div className='box-task bord bord--task-number'>
      <div className='box-task__title'>
        <h3 className='title'>記事の数</h3>
      </div>
      <div className='box-task__body'>
        <div className='numbers _flex_'>
          <div className='number-box __radius number-box--task-objective'>
            <p className='caption'>優先順位</p>
            <p className='number'>{ob.length}</p>
          </div>
          <div className='number-box __radius number-box--task-limit'>
            <p className='caption'>計画</p>
            <p className='number'>{plans.length}</p>
          </div>
          <div className='number-box __radius number-box--task-premise'>
            <p className='caption'>前提</p>
            <p className='number'>{premise.length}</p>
          </div>
          <div className='number-box __radius number-box--structural-pat'>
            <p className='caption'>構造</p>
            <p className='number'>{structuralPats.length}</p>
          </div>
          <div className='number-box __radius'>
            <p className='caption'>タスク数</p>
            <p className='number'>{tasks.length}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BordTaskNumber
