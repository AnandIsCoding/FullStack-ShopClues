import { configureStore } from "@reduxjs/toolkit";
import modalReducer from '../redux/slices/modal.slice.js'

const appStore = configureStore({
    reducer:{
        modal:modalReducer
    }
})

export default appStore