import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'item',
    initialState: {
        cartList: JSON.parse(localStorage.getItem('cart')) || [],
    },
    reducers: {
        add(state, action) {
            const updatedList = state.cartList.concat({ ...action.payload, quantity: 1 });
            return { ...state, cartList: updatedList };
        },
        remove(state, action) {
            const updatedList = state.cartList.filter(item => item._id !== action.payload._id);
            return { ...state, cartList: updatedList };
        },
        updateQuantity(state, action) {
            const { id, qty } = action.payload;
            const updatedList = state.cartList.map(item => {
                if (item._id === id) {
                    return { ...item, quantity: qty };
                }
                return item;
            });
            return { ...state, cartList: updatedList };
        }
    },
});

export const { add, remove, updateQuantity } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
