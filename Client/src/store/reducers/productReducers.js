// import { ADD_PRODUCT_TO_CART, REMOVE_PRODUCT_FROM_CART } from './actions';

import axios from "axios";

const initialState = {
    isCartButtonDisable:false,
    isDetailvisible:false,
    detailsId:null,
    detailsProduct:[],
    products: [],
    cartItems:'',
    totalPrice:0,
    purchased:false
};
 const getProductReducer =(state = initialState, action)=>{
     if (!localStorage.getItem('cartItems')) {
         localStorage.setItem('cartItems',[0]);
         console.log("not set")
     }
     console.log("Product reducer")
    switch (action.type) {
        case "SET_PRODUCT_DETAIL_ID":
            const detailsProduct=state.products.filter(product => product.id == action.payload);
            if(state.cartItems.length>0){
                const checkProductInCart=state.cartItems.filter(cart=>cart.id==action.payload);
                if(checkProductInCart.length>0)
                {
                    console.log("CheckProductINCART",checkProductInCart[0].id);
                    state={
                        ...state,
                        isDetailvisible: true,
                        detailsId: action.payload,
                        detailsProduct: detailsProduct,
                        isCartButtonDisable:true
                    }
                }
                else {
                    state={
                        ...state,
                        isDetailvisible: true,
                        detailsId: action.payload,
                        detailsProduct: detailsProduct,
                        isCartButtonDisable:false
                    }
                }
                return state
            }

                state={
                    ...state,
                    isDetailvisible: true,
                    detailsId: action.payload,
                    detailsProduct: detailsProduct,
                    isCartButtonDisable:false
                }

            break;


        case "RESET_DETAIL":
            state={
                ...state,
                isDetailvisible: false,
                detailsId: null,
                detailsProduct: []
            }
            break;
        case "BUY_PRODUCT":
            state={
                ...state,
                cartItems:[],
                purchased:action.payload
            }
            break;
        case "BUYED_PRODUCT":
            state={
                ...state,
                purchased:false
            }
            break;
        case "SET_PRODUCT":

            state = {
                ... state,
                products: action.payload,

            }
            if(window.sessionStorage.getItem("userid") !== null)

            {
                state={
                    ...state,
                    cartItems: action.user
                }
            }
            else {
                state={
                    ...state,
                    cartItems: JSON.parse(localStorage.getItem('cartItems'))
                }
            }
            break;
        case "Load_CART_ITEMS":
            // if (localStorage.getItem('cartItems')) {
            //     this.setState({ cartItems: JSON.parse(localStorage.getItem('cartItems')) });
            // }
            break;
        case "DELETE_FROM_CART":
            if(window.sessionStorage.getItem("userid") !== null)
            {
                const deleteCartItemsFromDb = state.cartItems.filter(a => a.id !== action.payload);
                state={
                    ...state,
                    cartItems: deleteCartItemsFromDb
                }
                console.log(action.payload);
            }
            else {
                const cartItems = state.cartItems.filter(a => a.id !== action.payload);
                state={
                    ...state,
                    cartItems:cartItems
                }
                localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
            }

            break;
        case "QUANTITY":
            const changeQuantity=state.cartItems.filter(product => product.id == action.payload.id);
            changeQuantity[0]['quantity']=action.quantity;
            state.cartItems.forEach(
                cp => {
                    if (cp.id === action.payload.id) {
                        cp.quantity=changeQuantity[0][['quantity']]
                    }
                }
            )
            state={
                ...state
            }
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
           return state

            break;
        case "ADD_ITEM_TO_CART_DB":

            break;
        case "ADD_TO_CART":
            let productAlreadyInCart=false;
            const addCart=state.products.filter(product => product.id == action.payload);
            console.log("add to cart",action.payload);
            //addCart[0]['quantity']=action.quantity;

            if(state.cartItems.length!='undefined' && state.cartItems.length>0){
                const check=state.cartItems.filter(items => items.id == action.payload);
                if(check.length!='undefined' && check.length>0)
                {
                    productAlreadyInCart = true;
                }
                else {
                    productAlreadyInCart = false;
                }
            }
            if (!productAlreadyInCart) {
                if(state.cartItems.length !='undefined' && state.cartItems.length>0)
                {
                    state={
                        ...state,
                        cartItems: [...state.cartItems,...addCart],
                        isCartButtonDisable:true
                        //totalPrice: state.totalPrice+addCart[0].price
                    }
                }
                else {
                    state={
                        ...state,
                        cartItems: [...addCart],
                        //totalPrice: state.totalPrice+addCart[0].price
                        isCartButtonDisable:true
                    }
                    //console.log("Price",addCart[0].price);
                }
                productAlreadyInCart = false;

            }
            if(window.sessionStorage.getItem("userid") !== null )
            {
                return state
            }
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));

            break;
    }
    return state;

}
export default getProductReducer;
