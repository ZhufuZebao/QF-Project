import {createSlice,PayloadAction} from '@reduxjs/toolkit'

interface State {
    rightList:Array<any>
    regionList:Array<any>
    roleList:Array<any>
    loadingNumber:number
}

const  initialState:State = {
    rightList:[],
    regionList:[],
    roleList:[],
    loadingNumber:0,
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
        },
        startLoading(state:State){
            state.loadingNumber++
        },
        closeLoading(state:State){
            state.loadingNumber--
        },
        clearData(state:State){
            state = initialState
        }
    }
})
export const {setRightList,setRegionList,setRoleList,clearData} = globalReducer.actions
export default globalReducer.reducer