import axios from "axios";
import {USER_DETAIL_FAIL, USER_DETAIL_REQUEST, USER_DETAIL_SUCCESS} from "../../Constants/User/UserDetailConstants";
import {logout} from "./UserLogoutActions";
import {URL} from "../../Url";

export const userDetail = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DETAIL_REQUEST
        })
        const {
            userLogin: {userInfo}
        } = getState()

        const config = {
            headers: {
                "Authorization": `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.get(`${URL}/api/users/profile`, config)
        dispatch({
            type: USER_DETAIL_SUCCESS, payload: data
        })
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message
        if (message === "Not authorized. Token failed!") {
            dispatch(logout())
        }
        dispatch({
            type: USER_DETAIL_FAIL, payload: message
        })
    }
}