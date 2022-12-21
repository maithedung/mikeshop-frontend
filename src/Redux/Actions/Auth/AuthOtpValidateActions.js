import axios from "axios";
import {AUTH_OTP_VALIDATE_URL} from "../../Url";
import {logout} from "../User/UserLogoutActions";
import {
    AUTH_OTP_VALIDATE_FAIL, AUTH_OTP_VALIDATE_REQUEST, AUTH_OTP_VALIDATE_SUCCESS
} from "../../Constants/Auth/AuthOtpValidateConstants";
import {USER_NOT_AUTHORIZED_ERROR} from "../../Messages";

export const validateAuthOtp = (userId, token) => async (dispatch, getState) => {
    try {
        dispatch({
            type: AUTH_OTP_VALIDATE_REQUEST
        })
        const {
            userLogin: {userInfo}
        } = getState()

        const config = {
            headers: {
                "Content-Type": "application/json", "Authorization": `Bearer ${userInfo.token}`
            }
        }

        const authData = {userId: userId, token: token}

        const {data} = await axios.post(AUTH_OTP_VALIDATE_URL, authData, config)
        dispatch({
            type: AUTH_OTP_VALIDATE_SUCCESS, payload: data
        })
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message
        if (message === USER_NOT_AUTHORIZED_ERROR) {
            dispatch(logout())
        }
        dispatch({
            type: AUTH_OTP_VALIDATE_FAIL, payload: message
        })
    }
}
