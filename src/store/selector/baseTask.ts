import { createSelector } from 'reselect'
import { BaseTaskState } from '../baseTask/slice'

export const baseTaskSelector = (state: BaseTaskState) => state.baseTask

export const getLogtoolsSelector = createSelector(baseTaskSelector, (baseTask) => {
  return baseTask
})
