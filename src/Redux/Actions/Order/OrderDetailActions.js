import axios from "axios";
import {logout} from "../User/UserLogoutActions";
import {
    ORDER_DETAIL_FAIL, ORDER_DETAIL_REQUEST, ORDER_DETAIL_SUCCESS
} from "../../Constants/Order/OrderDetailConstants";
import {ORDER_URL} from "../../Url";
import {USER_NOT_AUTHORIZED_ERROR} from "../../Messages";

export const detailOrder = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: ORDER_DETAIL_REQUEST
        })

        const {
            userLogin: {userInfo}
        } = getState()
        const config = {
            headers: {
                "Authorization": `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.get(`${ORDER_URL}/${id}`, config)

        dispatch({
            type: ORDER_DETAIL_SUCCESS, payload: data
        })
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message
        if (message === USER_NOT_AUTHORIZED_ERROR) {
            dispatch(logout())
        }

        dispatch({
            type: ORDER_DETAIL_FAIL, payload: message
        })
    }
}
