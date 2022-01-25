import { createSelector } from 'reselect'
import { TaskLimitState } from '../taskLimit/slice'

export const taskLimitStateSelector = (state: TaskLimitState) => state.taskLimit

export const getTaskPremiseSelector = createSelector(taskLimitStateSelector, (taskLimit) => {
  return taskLimit
})
