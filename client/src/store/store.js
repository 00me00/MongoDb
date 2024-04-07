import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./cardSlice";


const store=configureStore({
    reducer:{
        cartState:cartReducer
    }
})
export default store