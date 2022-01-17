import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Logtools, PostLogtools } from '../../models/logtools'

export type LogtoolsState = {
  loading: boolean,
  logs: Logtools[],
  error?: any
}

export const initialState: LogtoolsState = {
 loading: false,
 logs: [
    {
     title: "string;",
     sub_content: "string;",
     achieve_content: "string;",
     content: "string;",
     play_item: 1,
     clear_item: 1,
     created_at: "20211231",
     created_by: "20211231",
     updated_at: "20211231"
   }
 ],
}

const logtoolsSlice = createSlice({
  name: 'logstools',
  initialState,
  reducers: {
    updateLogs: (state,action: PayloadAction<LogtoolsState>) => ({
      ...state,
      loading: action.payload.loading,
      logs: action.payload.logs,
    }),
    logsFetchStart(state,action) {
      state.loading = true;
      state.error = null;
    },
    logsFetchFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    logsFetchSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.logs = action.payload
    }
  }
})

export const { logsFetchStart, logsFetchFailure, logsFetchSuccess } = logtoolsSlice.actions;

export const getFetchLogs = () => async (dispatch:any) => {
  try {
   dispatch(logsFetchStart)
   const res = await fetch('http://localhost:8008/logtool/index/',{method: 'GET'})
   const data = await res.json()
   if(res.status < 400){
     dispatch(logsFetchSuccess(data))
   }
   
  } catch {
   dispatch(logsFetchFailure)
  }
}

export const createFetchLogs = (data:PostLogtools) => async (dispatch:any) => {
 try {
  dispatch(logsFetchStart)
  const res = await fetch('http://localhost:8008/logtool/log_link/',
    {
     method: 'POST',
     mode: 'cors',
     headers: {
       'Content-Type': 'text/plain',
       // 'Access-Control-Allow-Origin': '*'
     },
     credentials: 'same-origin',
     body: JSON.stringify(data)
    })
  const re_data = await res.json()
  if(res.status < 400){
    dispatch(logsFetchSuccess(re_data))
  }
  
 } catch {
  dispatch(logsFetchFailure)
 }
}

export default logtoolsSlice
