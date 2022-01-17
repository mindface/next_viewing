import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TaskObjective, AddTaskObjective } from '../../models/TaskObjective'
import { FetchApi } from '../../api/fetch-api'

const fetchApi = new FetchApi()

export type TaskObjectiveState = {
  loading: boolean,
  taskObjective: TaskObjective[],
  error?: any
}

export const initialState: TaskObjectiveState = {
 loading: false,
 taskObjective: [{
     id: 0,
     title: "string;",
     disc_content: "string;",
     lank_id: 0,
     created_at: "20211231",
     updated_at: "20211231"
   }
 ],
}

const taskObjectiveSlice = createSlice({
  name: 'baseObjective',
  initialState,
  reducers: {
    updateLogs: (state,action: PayloadAction<TaskObjectiveState>) => ({
      ...state,
      loading: action.payload.loading,
      baseObjective: action.payload.taskObjective,
    }),
    taskObjectiveFetchStart(state,action) {
      state.loading = true;
      state.error = null;
    },
    taskObjectiveFetchFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    taskObjectiveFetchSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.taskObjective = action.payload
    }
  }
})

export const { taskObjectiveFetchStart, taskObjectiveFetchFailure, taskObjectiveFetchSuccess } = taskObjectiveSlice.actions;

export const getFetchTaskObjective = () => async (dispatch:any) => {
   dispatch(taskObjectiveFetchStart)
   fetchApi.GetFetch<TaskObjective>('http://localhost:8008/logtool/task_objective')
     .then( (res:TaskObjective) => {
        dispatch(taskObjectiveFetchSuccess(res))
     }).catch((err) => {
      dispatch(taskObjectiveFetchFailure(err))
     })
}

export const createFetchObjective = (data:AddTaskObjective) => async (dispatch:any) => {
  dispatch(taskObjectiveFetchStart)
  fetchApi.PostFetch<AddTaskObjective>('http://localhost:8008/logtool/task_objective',data)
    .then( (res:AddTaskObjective) => {
      console.log(res)
      dispatch(getFetchTaskObjective())
    }).catch((err) => {
      dispatch(taskObjectiveFetchFailure(err))
    })
}

export const updateFetchObjective = (data:AddTaskObjective) => async (dispatch:any) => {
  dispatch(taskObjectiveFetchStart)
  fetchApi.PutFetch<AddTaskObjective>('http://localhost:8008/logtool/task_objective',data)
    .then( (res:AddTaskObjective) => {
      console.log(res)
      dispatch(getFetchTaskObjective())
    }).catch((err) => {
      dispatch(taskObjectiveFetchFailure(err))
    })
}

export const deleteFetchObjective = (id:number) => async (dispatch:any) => {
  dispatch(taskObjectiveFetchStart)
  fetchApi.DeleteFetch(`http://localhost:8008/logtool/task_objective?params=${id}`)
    .then( (res:AddTaskObjective) => {
      dispatch(getFetchTaskObjective())
    }).catch((err) => {
      dispatch(taskObjectiveFetchFailure(err))
    })
}

export default taskObjectiveSlice
