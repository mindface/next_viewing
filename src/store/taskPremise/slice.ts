import { createSlice, PayloadAction, Dispatch } from '@reduxjs/toolkit'
import { rejects } from 'assert'
import { resolve } from 'path'
import { TaskPremise, AddTaskPremise, UpdateTaskPremise } from '../../models/TaskPremise'
import { FetchApi } from '../../api/fetch-api'

const fetchApi = new FetchApi()

export type TaskPremiseState = {
  loading: boolean,
  taskPremise: TaskPremise[],
  taskPremiseDisc: TaskPremise
  error?: any
}

export const initialState: TaskPremiseState = {
 loading: false,
 taskPremise: [{
     id: 0,
     title: "string;",
     disc_content: "string;",
     task_id: 0,
     created_at: "20211231",
     updated_at: "20211231"
   }
 ],
 taskPremiseDisc: {
  id: 0,
  title: "string;",
  disc_content: "string;",
  task_id: 0,
  created_at: "20211231",
  updated_at: "20211231"
 }
}

const taskPremiseSlice = createSlice({
  name: 'baseTask',
  initialState,
  reducers: {
    updateLogs: (state,action: PayloadAction<TaskPremiseState>) => ({
      ...state,
      loading: action.payload.loading,
      baseTask: action.payload.taskPremise,
    }),
    taskPremiseFetchStart(state,action) {
      state.loading = true;
      state.error = null;
    }, 
    taskPremiseFetchFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    taskPremiseFetchSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.taskPremise = action.payload
    },
    taskPremiseDiscFetchSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.taskPremiseDisc = action.payload
    }
  },
  extraReducers: {
  }
})

export const { taskPremiseFetchStart, taskPremiseFetchFailure, taskPremiseFetchSuccess, taskPremiseDiscFetchSuccess } = taskPremiseSlice.actions;

export const getFetchTaskPremise = () => async (dispatch:any) => {
  dispatch(taskPremiseFetchStart)
  fetchApi.GetFetch<TaskPremise>('http://localhost:8008/logtool/task_premise/')
    .then((res) => {
      dispatch(taskPremiseFetchSuccess(res))
    }).catch((err) => {
      dispatch(taskPremiseFetchFailure(err))
    })
}

export const getFetchTaskPremiseDisc = (id:number) => (dispatch:Dispatch<any>) => {
  dispatch(taskPremiseFetchStart)
  return new Promise((resolve,rejects) => {
    fetchApi.GetFetch<TaskPremise>(`http://localhost:8008/logtool/task_premise_disc?params=${id}`)
      .then((res) => {
          dispatch(taskPremiseDiscFetchSuccess(res))
          const dd = {
            id: res.id,
            title: res.title,
            disc_content: res.disc_content,
            task_id: Number(res.task_id),
            created_at: res.created_at,
            updated_at: res.updated_at,
          }
          resolve(dd)
      }).catch((err) => {
        dispatch(taskPremiseFetchFailure(err))
      })
  })
}

export const createFetchTaskPremise = (data:AddTaskPremise) => async (dispatch:any) => {
  dispatch(taskPremiseFetchStart)
  fetchApi.PostFetch<AddTaskPremise>('http://localhost:8008/logtool/task_premise/',data)
    .then(() => {
      dispatch(getFetchTaskPremise())
    }).catch((err) => {
      dispatch(taskPremiseFetchFailure)
    })
}

export const updateFetchTaskPremise = (data:UpdateTaskPremise) => async (dispatch:any) => {
  dispatch(taskPremiseFetchStart)
  fetchApi.PutFetch<UpdateTaskPremise>('http://localhost:8008/logtool/task_premise_disc',data)
    .then(() => {
      dispatch(getFetchTaskPremise())
    }).catch((err) => {
      dispatch(taskPremiseFetchFailure(err))
    })
 }

 export const deleteFetchTaskPremise = (id:number) => async (dispatch:any) => {
  dispatch(taskPremiseFetchStart)
  fetchApi.DeleteFetch(`http://localhost:8008/logtool/task_premise_disc?params=${id}`)
    .then(() => {
      dispatch(getFetchTaskPremise())
    }).catch((err) => {
      dispatch(taskPremiseFetchFailure(err))
    })
 }

export default taskPremiseSlice
