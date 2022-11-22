import { configureStore } from '@reduxjs/toolkit'
import toggleSlice from '../slice/toggleSlice'
import isAuthSlice from '../slice/isAuthSlice'
import inNavbarApp from '../slice/inNavbarApp'
import imageSlideSlice from '../slice/imageSlideSlice'
import searchSlice from '../slice/searchSlice'
import selectItemSlice from '../slice/selectItemSlice'

export const store = configureStore({
  reducer: {
    toggle: toggleSlice,
    isAuth: isAuthSlice,
    inNavbarApp: inNavbarApp,
    imageSlide: imageSlideSlice,
    searchParam: searchSlice,
    selectItem: selectItemSlice

  },
})