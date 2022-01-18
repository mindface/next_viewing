import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User, SetUser } from '../../models/user'
import { useRouter } from 'next/router'

export type userState = {
  loading: boolean
  user: User
  error?: any
  user_token: string
}

export const initialState: userState = {
  loading: false,
  user: {
    id: '20211231',
    username: 'string;',
    first_name: 'string;',
    last_name: '',
  },
  user_token: '',
}

const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<userState>) => ({
      ...state,
      loading: action.payload.loading,
      user: action.payload.user,
    }),
    userFetchStart(state, action) {
      state.loading = true
      state.error = null
    },
    userFetchFailure(state, action) {
      state.loading = false
      state.error = action.payload
    },
    userFetchSuccess(state, action) {
      state.loading = false
      state.error = null
      state.user = action.payload
    },
    userTokenFetchSuccess(state, action) {
      state.loading = false
      state.error = null
      state.user_token = action.payload.token
    },
  },
})

export const { userFetchStart, userFetchFailure, userFetchSuccess, userTokenFetchSuccess } =
  UserSlice.actions

export const getFetchUserinfo = () => async (dispatch: any) => {
  try {
    dispatch(userFetchStart)
    const res = await fetch('http://localhost:8008/logtool/index/', {
      method: 'GET',
    })
    const data = await res.json()
    if (res.status < 400) {
      dispatch(userFetchSuccess(data))
    }
  } catch {
    dispatch(userFetchFailure)
  }
}

export const getUser = (name: string) => async (dispatch: any, state: userState) => {
  try {
    dispatch(userFetchStart)
    const res = await fetch('http://localhost:8008/logtool/user/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: name }),
    })
    const data = await res.json()
    if (res.status < 400) {
      dispatch(userFetchSuccess(data))
      window.location.href = '/dashbord'
      //  route.push('/dashbord')
    }
  } catch {
    dispatch(userFetchFailure)
  }
}

export const resetUser = () => async (dispatch: any, state: userState) => {
  dispatch(userFetchStart)
  setTimeout(() => {
    dispatch(
      userFetchSuccess({
        id: '1',
        username: 'logout',
        first_name: 'logout',
        last_name: 'logout',
      }),
    )
    dispatch(userTokenFetchSuccess(''))
    window.location.href = '/login'
  }, 600)
}

export const getFetchUser = () => async (dispatch: any) => {
  try {
    dispatch(userFetchStart)
    const res = await fetch('http://localhost:8008/logtool/index/', {
      method: 'GET',
    })
    const data = await res.json()
    if (res.status < 400) {
      dispatch(userFetchSuccess(data))
    }
  } catch {
    dispatch(userFetchFailure)
  }
}

export const postAuthFetchUser = (name: string, pass: string) => async (dispatch: any) => {
  try {
    dispatch(userFetchStart)
    const res = await fetch('http://localhost:8008/api-token-auth/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: name, password: pass }),
    })
    const data = await res.json()
    if (res.status < 400) {
      dispatch(getUser(name))
      dispatch(userTokenFetchSuccess(data))
    }
  } catch {
    dispatch(userFetchFailure)
  }
}

export default UserSlice
