import { createSlice } from "@reduxjs/toolkit";

const imageSlide = createSlice({
    name:'imageSlide',
    initialState:{
        image:[]
    },
    reducers:{
        ADD_IMAGES:(state,actions)=>{
            state.image = actions.payload
        }
    }
})

export const {ADD_IMAGES} = imageSlide.actions
export default imageSlide.reducer