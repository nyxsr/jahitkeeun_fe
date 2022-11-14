import { createSlice } from "@reduxjs/toolkit";

const toggleSlice = createSlice({
    name: 'toggle',
    initialState:{
        toggle:false
    },
    reducers:{
        TOGGLED:(state,action)=>{
            state.toggle = action.payload
        }
    }
})

export const {TOGGLED} = toggleSlice.actions
export default toggleSlice.reducer