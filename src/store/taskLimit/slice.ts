import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TaskLimit, AddTaskLimit } from '../../models/TaskLimit'
import { FetchApi } from '../../api/fetch-api'

const fetchApi = new FetchApi()

export type TaskLimitState = {
  loading: boolean,
  taskLimit: TaskLimit[],
  error?: any
}

export const initialState: TaskLimitState = {
 loading: false,
 taskLimit: [{
     id: 0,
     title: "none",
     disc_content: "none",
     start_time: "20211231",
     end_time: "20211231",
     task_id: 0,
     created_at: "20211231",
     updated_at: "20211231"
   }
 ],
}

const taskLimitSlice = createSlice({
  name: 'taskLimit',
  initialState,
  reducers: {
    updateTaskLimit: (state,action: PayloadAction<TaskLimitState>) => ({
      ...state,
      loading: action.payload.loading,
      baseTask: action.payload.taskLimit,
    }),
    taskLimitFetchStart(state,action) {
      state.loading = true;
      state.error = null;
    },
    taskLimitFetchFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    taskLimitFetchSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.taskLimit = action.payload
    }
  }
})

export const { taskLimitFetchStart, taskLimitFetchFailure, taskLimitFetchSuccess } = taskLimitSlice.actions;

export const getFetchTaskLimits = () => async (dispatch:any) => {
  dispatch(taskLimitFetchStart)
  fetchApi.GetFetch<TaskLimit>('http://localhost:8008/logtool/task_limit')
    .then((res) => {
      dispatch(taskLimitFetchSuccess(res))
    }).catch((err) => {
      dispatch(taskLimitFetchFailure(err))
    })
}

export const createFetchTaskLimit = (data:AddTaskLimit) => async (dispatch:any) => {
  dispatch(taskLimitFetchStart)
  fetchApi.PostFetch<AddTaskLimit>('http://localhost:8008/logtool/task_limit',data)
    .then((res) => {
      dispatch(getFetchTaskLimits())
    }).catch((err) => {
      dispatch(taskLimitFetchFailure(err))
    })
}

export const updateFetchTaskLimit = (data:AddTaskLimit) => async (dispatch:any) => {
  dispatch(taskLimitFetchStart)
  fetchApi.PutFetch<AddTaskLimit>('http://localhost:8008/logtool/task_limit',data)
    .then((res) => {
      dispatch(getFetchTaskLimits())
    }).catch((err) => {
      dispatch(taskLimitFetchFailure(err))
    })
}

export const deleteFetchTaskLimit = (id:number) => async (dispatch:any) => {
  dispatch(taskLimitFetchStart)
  fetchApi.DeleteFetch(`http://localhost:8008/logtool/task_limit?params=${id}`)
    .then((res) => {
      dispatch(getFetchTaskLimits())
    }).catch((err) => {
      dispatch(taskLimitFetchFailure(err))
    })
}

export default taskLimitSlice
