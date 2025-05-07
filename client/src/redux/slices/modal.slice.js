import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    showSignupPage: false,
  };

  const modalSlice = createSlice({
    name:'modal',
    initialState,
    reducers:{
        setShowSignup:(state,action)=>{
            state.showSignupPage = action.payload
        },
        toggleSignupModal:(state,action)=>{
            state.showSignupPage = !state.showSignupPage
        }
    }
  })


  export const {setShowSignup, toggleSignupModal} = modalSlice.actions
  export default modalSlice.reducer
