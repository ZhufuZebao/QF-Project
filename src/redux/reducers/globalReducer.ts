import {createSlice,PayloadAction} from '@reduxjs/toolkit'

interface State {
    rightList:Array<any>
}

const  initialState:State = {
    rightList:[]
}

const globalReducer = createSlice({
    name:'globalReducer',
    initialState,
    reducers:{
        setRightList(state:State,action:PayloadAction<Array<any>>){
            console.log('action',action)
            state.rightList = [...action.payload]
        }
    }
})
export const {setRightList} = globalReducer.actions
export default globalReducer.reducer