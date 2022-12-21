import axios from "axios";
import {logout} from "../User/UserLogoutActions";
import {ORDER_LIST_FAIL, ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS} from "../../Constants/Order/OrderListConstants";
import {ORDER_URL} from "../../Url";
import {USER_NOT_AUTHORIZED_ERROR} from "../../Messages";

export const listOrder = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_LIST_REQUEST
        })
        const {
            userLogin: {userInfo}
        } = getState()

        const config = {
            headers: {
                "Authorization": `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.get(ORDER_URL, config)
        dispatch({
            type: ORDER_LIST_SUCCESS, payload: data
        })
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message
        if (message === USER_NOT_AUTHORIZED_ERROR) {
            dispatch(logout())
        }
        dispatch({
            type: ORDER_LIST_FAIL, payload: message
        })
    }
}
