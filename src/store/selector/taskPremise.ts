import { createSelector } from 'reselect'
import { TaskPremiseState } from '../taskPremise/slice'

export const taskPremiseStateSelector = (state: TaskPremiseState) => state.taskPremise

export const getTaskPremiseSelector = createSelector(taskPremiseStateSelector, (taskPremise) => {
  return taskPremise
})
