import { createSlice } from "@reduxjs/toolkit";

const inNavbarApp = createSlice({
    name:'inNavbarApp',
    initialState:{
        isApp:false
    },
    reducers:{
        IN_NAVBAR_APP:(state,actions)=>{
            state.isApp = actions.payload
            sessionStorage.setItem('inNavbarApp',state.isApp)
        }
    }
})

export const {IN_NAVBAR_APP} = inNavbarApp.actions
export default inNavbarApp.reducer