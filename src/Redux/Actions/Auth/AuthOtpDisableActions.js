import axios from "axios";
import {URL} from "../../Url";
import {
    AUTH_OTP_DISABLE_FAIL, AUTH_OTP_DISABLE_REQUEST, AUTH_OTP_DISABLE_SUCCESS
} from "../../Constants/Auth/AuthOtpDisableConstants";
import {logout} from "../User/UserLogoutActions";
import {USER_NOT_AUTHORIZED_ERROR} from "../../Messages";

export const disableAuthOtp = (userId) => async (dispatch, getState) => {
    try {
        dispatch({
            type: AUTH_OTP_DISABLE_REQUEST
        })
        const {
            userLogin: {userInfo}
        } = getState()

        const config = {
            headers: {
                "Content-Type": "application/json", "Authorization": `Bearer ${userInfo.token}`
            }
        }

        const authData = {userId: userId}

        const {data} = await axios.post(`${URL}/api/auth/otp/disable`, authData, config)
        dispatch({
            type: AUTH_OTP_DISABLE_SUCCESS, payload: data
        })
        document.location.href = "/profile"
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message
        if (message === USER_NOT_AUTHORIZED_ERROR) {
            dispatch(logout())
        }
        dispatch({
            type: AUTH_OTP_DISABLE_FAIL, payload: message
        })
    }
}
