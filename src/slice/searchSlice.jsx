import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name:'searchparams',
    initialState:{
        paramsSearch:''
    },
    reducers:{
        ADD_PARAMS:(state,actions)=>{
            state.paramsSearch = actions.payload
        }
    }
})

export const {ADD_PARAMS} = searchSlice.actions
export default searchSlice.reducer