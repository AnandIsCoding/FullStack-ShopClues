import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user:null,
    cart:null
}
const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        setUser:(state,action)=>{
            state.user = action.payload
        },
        setUserCart:(state,action)=>{
            state.cart = action.payload
        }
    }
})

export const {setUser, setUserCart} = userSlice.actions
export default userSlice.reducer