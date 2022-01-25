import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { BaseTask, AddBaseTask } from '../../models/baseTask'
import { FetchApi } from '../../api/fetch-api'

const fetchApi = new FetchApi()

export type BaseTaskState = {
  loading: boolean
  baseTasks: BaseTask[]
  baseTask: BaseTask
  error?: any
}

export const initialState: BaseTaskState = {
  loading: false,
  baseTasks: [
    {
      id: 0,
      title: 'string;',
      disc_content: 'string;',
      user_name: 'demo',
      play_item: 0,
      clear_item: 0,
      created_at: '20211231',
      updated_at: '20211231',
    },
  ],
  baseTask: {
    id: 0,
    title: 'string;',
    disc_content: 'string;',
    user_name: 'demo',
    play_item: 0,
    clear_item: 0,
    created_at: '20211231',
    updated_at: '20211231',
  },
}

const baseTaskSlice = createSlice({
  name: 'baseTask',
  initialState,
  reducers: {
    // updateLogs: (state,action: PayloadAction<BaseTaskState>) => ({
    //   ...state,
    //   loading: action.payload.loading,
    //   baseTasks: action.payload.baseTask,
    // }),
    baseTaskFetchStart(state, action) {
      state.loading = true
      state.error = null
    },
    baseTaskFetchFailure(state, action) {
      state.loading = false
      state.error = action.payload
    },
    baseTasksFetchSuccess(state, action) {
      state.loading = false
      state.error = null
      state.baseTasks = action.payload
    },
    baseTaskFetchSuccess(state, action) {
      state.loading = false
      state.error = null
      state.baseTask = action.payload
    },
  },
})

export const {
  baseTaskFetchStart,
  baseTaskFetchFailure,
  baseTasksFetchSuccess,
  baseTaskFetchSuccess,
} = baseTaskSlice.actions

export const getFetchBaseTasks = () => async (dispatch: any) => {
  dispatch(baseTaskFetchStart)
  fetchApi
    .GetFetch<BaseTask>('http://localhost:8008/logtool/base_tasks')
    .then((res) => {
      dispatch(baseTasksFetchSuccess(res))
    })
    .catch((err) => {
      dispatch(baseTaskFetchFailure(err))
    })
}

export const getFetchBaseTask = (id: number) => async (dispatch: any) => {
  dispatch(baseTaskFetchStart)
  fetchApi
    .GetFetch(`http://localhost:8008/logtool/base_tasks?params=${id}`)
    .then((res) => {
      dispatch(baseTaskFetchSuccess(res))
    })
    .catch((err) => {
      dispatch(baseTaskFetchFailure(err))
    })
}

export const createFetchBaseTask = (data: AddBaseTask) => async (dispatch: any) => {
  dispatch(baseTaskFetchStart)
  fetchApi
    .PostFetch<AddBaseTask>('http://localhost:8008/logtool/base_tasks', data)
    .then((res) => {
      dispatch(getFetchBaseTasks())
    })
    .catch((err) => {
      dispatch(baseTaskFetchFailure(err))
    })
}

export const updateFetchBaseTask = (data: AddBaseTask) => async (dispatch: any) => {
  dispatch(baseTaskFetchStart)
  fetchApi
    .PutFetch<AddBaseTask>('http://localhost:8008/logtool/base_tasks', data)
    .then((res) => {
      dispatch(getFetchBaseTasks())
    })
    .catch((err) => {
      dispatch(baseTaskFetchFailure(err))
    })
}

export const deleteFetchBaseTask = (id: number) => async (dispatch: any) => {
  dispatch(baseTaskFetchStart)
  fetchApi
    .DeleteFetch(`http://localhost:8008/logtool/base_tasks?params=${id}`)
    .then((res) => {
      dispatch(getFetchBaseTasks())
    })
    .catch((err) => {
      dispatch(baseTaskFetchFailure(err))
    })
}

export default baseTaskSlice
