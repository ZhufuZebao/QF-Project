import {configureStore} from '@reduxjs/toolkit'
import globalSlice from './reducers/globalReducer'

const store = configureStore({
    reducer:{
        globalSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export default  store