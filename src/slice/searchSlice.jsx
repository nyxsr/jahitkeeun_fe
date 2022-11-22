import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
    name:'searchparams',
    initialState:{
        paramsSearch:''
    },
    reducers:{
        ADD_PARAMS:(state,actions)=>{
            let params = actions.payload
            state.paramsSearch = params
        }
    }
})

export const {ADD_PARAMS} = searchSlice.actions
export default searchSlice.reducer