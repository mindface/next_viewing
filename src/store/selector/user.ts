import { createSelector } from 'reselect'
import { LogtoolsState } from '../logtools/slice'

export const userSelector = (state:LogtoolsState) => state.logs

export const getLogtoolsSelector = createSelector(userSelector, (user) => {
   return user
})
