import { createSlice, PayloadAction, Dispatch } from '@reduxjs/toolkit'
import { rejects } from 'assert'
import { resolve } from 'path'
import { StructuralPattern, AddStructuralPattern, UpdateStructuralPattern } from '../../models/StructuralPattern'
import { FetchApi } from '../../api/fetch-api'

const fetchApi = new FetchApi()

export type StructuralPatternState = {
  loading: boolean,
  structuralPats: StructuralPattern[],
  structuralPat: StructuralPattern
  error?: any
}

export const initialState: StructuralPatternState = {
 loading: false,
 structuralPats: [{
     id: 0,
     title: "loading ...",
     disc_content: "loading ...",
     user_name: "loading ...",
     structural: "loading ...",
     structuralArry: [],
     pattern: "loading ...",
     task_id: 0,
     category_id: "loading ...",
     category_group_id: "loading ...",
     created_at: "20211231",
     updated_at: "20211231"
   }
 ],
 structuralPat: {
  id: 0,
  title: "loading ...",
  disc_content: "loading ...",
  user_name: "loading ...",
  structural: "loading ...",
  structuralArry: [],
  pattern: "loading ...",
  task_id: 0,
  category_id: "loading ...",
  category_group_id: "loading ...",
  created_at: "20211231",
  updated_at: "20211231"
 }
}

const StructuralPatSlice = createSlice({
  name: 'baseTask',
  initialState,
  reducers: {
    updateLogs: (state,action: PayloadAction<StructuralPatternState>) => ({
      ...state,
      loading: action.payload.loading,
      baseTask: action.payload.structuralPats,
    }),
    StructuralPatFetchStart(state,action) {
      state.loading = true;
      state.error = null;
    }, 
    StructuralPatFetchFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    StructuralPatsFetchSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.structuralPats = action.payload
    },
    StructuralPatFetchSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.structuralPat = action.payload
    }
  },
  extraReducers: {
  }
})

export const { StructuralPatFetchStart, StructuralPatFetchFailure, StructuralPatsFetchSuccess, StructuralPatFetchSuccess } = StructuralPatSlice.actions;

export const getFetchStructuralPats = () => async (dispatch:any) => {
  dispatch(StructuralPatFetchStart)
  fetchApi.GetFetch<StructuralPattern[]>('http://localhost:8008/logtool/structural_pattern')
    .then((res) => {
      dispatch(StructuralPatsFetchSuccess(res))
    }).catch((err) => {
      dispatch(StructuralPatFetchFailure(err))
    })
}

export const getFetchStructuralPat = (id:number) => (dispatch:Dispatch<any>) => {
  dispatch(StructuralPatFetchStart)
  fetchApi.GetFetch<StructuralPattern>(`http://localhost:8008/logtool/structural_pattern?params=${id}`)
    .then((res) => {
      dispatch(StructuralPatFetchSuccess(res))
    }).catch((err) => {
      dispatch(StructuralPatFetchFailure(err))
    })
}

export const createFetchStructuralPat = (data:AddStructuralPattern) => async (dispatch:any) => {
  dispatch(StructuralPatFetchStart)
  fetchApi.PostFetch<AddStructuralPattern>('http://localhost:8008/logtool/structural_pattern',data)
    .then(() => {
      dispatch(getFetchStructuralPats())
    }).catch((err) => {
      dispatch(StructuralPatFetchFailure)
    })
}

export const updateFetchStructuralPat = (data:UpdateStructuralPattern) => async (dispatch:any) => {
  dispatch(StructuralPatFetchStart)
  fetchApi.PutFetch<UpdateStructuralPattern>('http://localhost:8008/logtool/structural_pattern',data)
    .then(() => {
      dispatch(getFetchStructuralPats())
    }).catch((err) => {
      dispatch(StructuralPatFetchFailure(err))
    })
 }

 export const deleteFetchStructuralPat = (id:number) => async (dispatch:any) => {
  dispatch(StructuralPatFetchStart)
  fetchApi.DeleteFetch(`http://localhost:8008/logtool/structural_pattern?params=${id}`)
    .then(() => {
      dispatch(getFetchStructuralPats())
    }).catch((err) => {
      dispatch(StructuralPatFetchFailure(err))
    })
 }

export default StructuralPatSlice
