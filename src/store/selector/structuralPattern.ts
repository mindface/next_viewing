import { createSelector } from 'reselect'
import { StructuralPatternState } from '../structuralPattern/slice'

export const taskPremiseStateSelector = (state:StructuralPatternState) => state.structuralPats

export const getStructuralPatsSelector = createSelector(taskPremiseStateSelector, (StructuralPats) => {
   return StructuralPats
})
