import axios from "axios";
import {logout} from "../User/UserLogoutActions";
import {ORDER_PAY_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS} from "../../Constants/Order/OrderPayConstants";
import {URL} from "../../Url";

export const payOrder = (orderId, paymentResult) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_PAY_REQUEST
        })
        const {
            userLogin: {userInfo}
        } = getState()

        const config = {
            headers: {
                "Content-Type": "application/json", "Authorization": `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.put(`${URL}/api/orders/${orderId}/pay`, paymentResult, config)
        dispatch({
            type: ORDER_PAY_SUCCESS, payload: data
        })
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message
        if (message === "Not authorized. Token failed!") {
            dispatch(logout())
        }
        dispatch({
            type: ORDER_PAY_FAIL, payload: message
        })
    }
}