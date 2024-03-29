import axios from "axios";
import {USER_DETAIL_FAIL, USER_DETAIL_REQUEST, USER_DETAIL_SUCCESS} from "../../Constants/User/UserDetailConstants";
import {logout} from "./UserLogoutActions";
import {USER_PROFILE_URL} from "../../Url";
import {USER_NOT_AUTHORIZED_ERROR} from "../../Messages";

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

        const {data} = await axios.get(USER_PROFILE_URL, config)
        dispatch({
            type: USER_DETAIL_SUCCESS, payload: data
        })
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message
        if (message === USER_NOT_AUTHORIZED_ERROR) {
            dispatch(logout())
        }
        dispatch({
            type: USER_DETAIL_FAIL, payload: message
        })
    }
}
