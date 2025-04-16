import { DataProps } from './../proptypes/DataProps';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartState {
    cartList: DataProps[];
}

const savedCart = localStorage.getItem("cart");
const initialState: CartState = (savedCart
    ? JSON.parse(savedCart)
    : { cartList: [] }
)

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart: (state, action: PayloadAction<DataProps>) => {
        const product = action.payload

        if(!product.selectedColor && product.color && product.color.length > 0 ) {
            product.selectedColor = product.color[0]
        }
        
        const existingItem = state.cartList.find(
            (item => item.id === product.id && item.selectedColor === product.selectedColor)
        );

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            state.cartList.push(action.payload);
        }
        localStorage.setItem("cart", JSON.stringify({ cartList: state.cartList }));
    },
    deleteItemCart: ( state, action: PayloadAction<DataProps>) => {
        state.cartList = state.cartList.filter(item => !(item.id === action.payload.id && item.selectedColor === action.payload.selectedColor))
        localStorage.setItem("cart", JSON.stringify({ cartList: state.cartList }));
    },
    resetCart: (state) => {
        state.cartList = []
        localStorage.setItem("cart", JSON.stringify({ cartList: [] }));
    },
    increaseItem: (state, action: PayloadAction<{id: number; selectedColor: string}>) => {
        const item = state.cartList.find(
            (i) => i.id === action.payload.id && i.selectedColor === action.payload.selectedColor
        )

        if(item) {
            item.quantity += 1
            localStorage.setItem("cart", JSON.stringify({ cartList: state.cartList }));
        }
    },
    decreaseItem: (state, action: PayloadAction<{id: number; selectedColor: string}>) => {
        const item = state.cartList.find(
            (i) => i.id === action.payload.id && i.selectedColor === action.payload.selectedColor
        )

        if(item) {
            if (item.quantity > 1) {
                item.quantity -= 1
            } else {
                state.cartList = state.cartList.filter(
                (pd) => !(pd.id === action.payload.id && pd.selectedColor === action.payload.selectedColor))
            }

            localStorage.setItem("cart", JSON.stringify({ cartList: state.cartList }));
        }
    },
  },
});

export const { addItemToCart, deleteItemCart, resetCart, increaseItem, decreaseItem } = cartSlice.actions;
export default cartSlice.reducer;