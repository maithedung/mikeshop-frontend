import axios from "axios";
import {
    ORDER_CREATE_FAIL, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS
} from "../../Constants/Order/OrderCreateConstants";
import {CART_CLEAR_ITEMS} from "../../Constants/Cart/CartConstants";
import {logout} from "../User/UserLogoutActions";
import {ORDER_URL} from "../../Url";
import {USER_NOT_AUTHORIZED_ERROR} from "../../Messages";

export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_CREATE_REQUEST
        })

        const {
            userLogin: {userInfo}
        } = getState()
        const config = {
            headers: {
                "Content-Type": "application/json", "Authorization": `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.post(ORDER_URL, order, config)

        dispatch({
            type: ORDER_CREATE_SUCCESS, payload: data
        })

        dispatch({
            type: CART_CLEAR_ITEMS, payload: data
        })

        localStorage.removeItem("cartItems")
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message
        if (message === USER_NOT_AUTHORIZED_ERROR) {
            dispatch(logout())
        }
        dispatch({
            type: ORDER_CREATE_FAIL, payload: message
        })
    }
}
