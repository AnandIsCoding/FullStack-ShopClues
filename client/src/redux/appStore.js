import { configureStore } from "@reduxjs/toolkit";
import modalReducer from '../redux/slices/modal.slice.js'
import userReducer from '../redux/slices/user.slice.js'

const appStore = configureStore({
    reducer:{
        modal:modalReducer,
        user:userReducer
    }
})

export default appStore