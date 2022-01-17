import { Store, combineReducers } from 'redux'
import { logger } from 'redux-logger'
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'

import logtoolsSlice, { initialState as logtoolsState } from './logtools/slice'
import userSlice, { initialState as userState } from './user/slice'
import baseTaskSlice, { initialState as baseTaskState } from './baseTask/slice'
import taskObjectiveSlice, { initialState as taskObjectiveState } from './taskObjective/slice'
import taskPremiseSlice, { initialState as taskPremiseState } from './taskPremise/slice'
import taskLimitSlice, { initialState as taskLimitState } from './taskLimit/slice'
import structuralPatternSlice, { initialState as structuralPatternState } from './structuralPattern/slice'

const rootReducer = combineReducers({
  logtools: logtoolsSlice.reducer,
  user: userSlice.reducer,
  baseTask: baseTaskSlice.reducer,
  taskObjective: taskObjectiveSlice.reducer,
  taskPremise: taskPremiseSlice.reducer,
  taskLimit: taskLimitSlice.reducer,
  structuralPat: structuralPatternSlice.reducer,
})

const preloadedState = () => {
  return {
    logtools: logtoolsState,
    user: userState,
    baseTask: baseTaskState,
    taskObjective: taskObjectiveState,
    taskPremise: taskPremiseState,
    taskLimit: taskLimitState,
    structuralPat: structuralPatternState
  }
}

export type StoreState = ReturnType<typeof preloadedState>;

export type ReuxStore = Store<StoreState>

const Store = () => {
  const middlewareList = [...getDefaultMiddleware(), logger];

  return configureStore({
    reducer: rootReducer,
    middleware: middlewareList,
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState: preloadedState()
  })
}

export default Store