import { createSlice } from "@reduxjs/toolkit";

const selectItemSlice = createSlice({
    name:'selectItem',
    initialState:{
        taylorId:'',
        itemId:''
    },
    reducers:{
        SELECT_ITEM:(state,actions)=>{
            state.taylorId = actions.payload.taylorId
            state.itemId = actions.payload.itemId
        }
    }
})

export const {SELECT_ITEM} = selectItemSlice.actions
export default selectItemSlice.reducer