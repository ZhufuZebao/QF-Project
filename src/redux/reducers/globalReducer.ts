import {createSlice,PayloadAction} from '@reduxjs/toolkit'

interface State {
    rightList:Array<any>
    regionList:Array<any>
    roleList:Array<any>
}

const  initialState:State = {
    rightList:[],
    regionList:[],
    roleList:[]
}

const globalReducer = createSlice({
    name:'globalReducer',
    initialState,
    reducers:{
        setRightList(state:State,action:PayloadAction<Array<any>>){
            state.rightList = [...action.payload]
        },
        setRegionList(state:State,action:PayloadAction<Array<any>>){
            state.regionList = [...action.payload]
        },
        setRoleList(state:State,action:PayloadAction<Array<any>>){
            state.roleList = [...action.payload]
        }
    }
})
export const {setRightList,setRegionList,setRoleList} = globalReducer.actions
export default globalReducer.reducer