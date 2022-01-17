import { createSelector } from 'reselect'
import { LogtoolsState } from '../logtools/slice'

export const logtoolsSelector = (state:LogtoolsState) => state.logs

export const getLogtoolsSelector = createSelector(logtoolsSelector, (logs) => {
   return logs
})
