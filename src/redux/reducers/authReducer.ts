import {createSlice,PayloadAction} from '@reduxjs/toolkit'
const defauleUserInfo:userInfoInterface = {
    id:0,
    default:false,
    username:'',
    password:'',
    roleState:false,
    roleId:0,
    region:'',
    role:{
        id:0,
        roleName:'',
        roleType:0,
        rights:[],
    },
}

interface roleInterface {
    id:number,
    roleName:string,
    roleType:number,
    rights:Array<string>
}
interface userInfoInterface {
    id:number,
    default:boolean,
    username:string,
    password:string,
    roleState:boolean,
    roleId:number,
    region:string,
    role:roleInterface
}
interface State {
    userInfo:userInfoInterface,
}
const initialState:State = {
    userInfo:defauleUserInfo
}

const authReducer = createSlice({
    name:'authReducer',
    initialState,
    reducers:{
        login(state:State,action:PayloadAction<any>){
            localStorage.setItem('token',action.payload[0].username)
            state.userInfo = {...action.payload[0]}
        },
        logout(state:State){
            localStorage.removeItem('token')
            localStorage.removeItem('persist:root')
            state = initialState
        }
    }
})
export const {login,logout} = authReducer.actions
export default authReducer.reducer