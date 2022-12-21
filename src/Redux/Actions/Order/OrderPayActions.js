import axios from "axios";
import {logout} from "../User/UserLogoutActions";
import {ORDER_PAY_FAIL, ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS} from "../../Constants/Order/OrderPayConstants";
import {ORDER_URL} from "../../Url";
import {USER_NOT_AUTHORIZED_ERROR} from "../../Messages";

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

        const {data} = await axios.put(`${ORDER_URL}/${orderId}/pay`, paymentResult, config)
        dispatch({
            type: ORDER_PAY_SUCCESS, payload: data
        })
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message
        if (message === USER_NOT_AUTHORIZED_ERROR) {
            dispatch(logout())
        }
        dispatch({
            type: ORDER_PAY_FAIL, payload: message
        })
    }
}
