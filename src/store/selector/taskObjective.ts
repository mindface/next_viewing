import { createSelector } from 'reselect'
import { TaskObjectiveState } from '../taskObjective/slice'

export const taskObjectiveStateSelector = (state: TaskObjectiveState) => state.taskObjective

export const getTaskObjectiveSelector = createSelector(
  taskObjectiveStateSelector,
  (taskObjective) => {
    return taskObjective
  },
)
