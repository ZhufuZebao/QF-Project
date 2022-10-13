import {configureStore} from '@reduxjs/toolkit'
import globalSlice from './reducers/globalReducer'
import authSlice from './reducers/authReducer'

const store = configureStore({
    reducer:{
        authSlice,
        globalSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export default  store