import { createSlice } from "@reduxjs/toolkit";

const isAuthSlice = createSlice({
    name:'isAuth',
    initialState:{
        isAuth:0
    },
    reducers:{
        IS_AUTH:(state,action)=>{
            state.isAuth = action.payload
            localStorage.setItem('isAuthSelected',state.isAuth)
        }
    }
})

export const {IS_AUTH} = isAuthSlice.actions
export default isAuthSlice.reducer