import axios from "axios";
import {
    CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS
} from "../../Constants/Cart/CartConstants";
import {URL} from "../../Url";

// ADD PRODUCT TO CART
export const addToCard = (id, quantity) => async (dispatch, getState) => {
    const {data} = await axios.get(`${URL}/api/products/${id}`)

    dispatch({
        type: CART_ADD_ITEM, payload: {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            quantity
        }
    })

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
}

// REMOVE PRODUCT FROM CART
export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEM, payload: id
    })

    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
}

// SAVE SHIPPING ADDRESS
export const saveShippingAddress = (data) => (dispatch, getState) => {
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS, payload: data
    })

    localStorage.setItem("shippingAddress", JSON.stringify(data))
}

// SAVE PAYMENT METHOD
export const savePaymentMethod = (data) => (dispatch, getState) => {
    dispatch({
        type: CART_SAVE_PAYMENT_METHOD, payload: data
    })

    localStorage.setItem("paymentMethod", JSON.stringify(data))
}