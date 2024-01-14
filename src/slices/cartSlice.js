import { createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";


const initialState = {
    totalItem : localStorage.getItem("totalItem") ? JSON.parse(localStorage.getItem("totalItem")) : 0 ,
 }


const cartSlice = createSlice({
    name : "cart" ,
    initialState ,
    reducers : {
        setTotalItems(state, value){
            state.totalItem = value.payload;
        }
        // add to cart

        // remove to cart

        // reset cart
    }
})

export const {setToken} = cartSlice.actions ;
export default cartSlice.reducer ;




