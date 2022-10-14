import {configureStore,combineReducers} from '@reduxjs/toolkit'
import {persistStore,persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import globalSlice from './reducers/globalReducer'
import authSlice from './reducers/authReducer'

const config = {
    key: 'root',
    storage:storage,
}

const store = configureStore({
    reducer:persistReducer(config,combineReducers({
        authSlice,
        globalSlice
    })),
    middleware:(getDefaultMiddleware:any) =>
        getDefaultMiddleware({
            serializableCheck: false,
        })
})
persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export default  store