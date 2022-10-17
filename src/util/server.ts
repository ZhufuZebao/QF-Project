import axios from "axios";
import store from '../redux/store'
axios.defaults.baseURL='http://localhost:8000'

axios.interceptors.request.use((config:any) => {
    store.dispatch({type:'globalReducer/startLoading'})
    return config
})
axios.interceptors.response.use((response) => {
    store.dispatch({type:'globalReducer/closeLoading'})
    return response
})