import axios from "axios";
import {URL} from "../../Url";
import {logout} from "../User/UserLogoutActions";
import {
    AUTH_OTP_VERIFY_FAIL, AUTH_OTP_VERIFY_REQUEST, AUTH_OTP_VERIFY_SUCCESS
} from "../../Constants/Auth/AuthOtpVerifyConstants";
import {USER_NOT_AUTHORIZED_ERROR} from "../../Messages";

export const verifyAuthOtp = (userId, token) => async (dispatch, getState) => {
    try {
        dispatch({
            type: AUTH_OTP_VERIFY_REQUEST
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

        const {data} = await axios.post(`${URL}/api/auth/otp/verify`, authData, config)
        dispatch({
            type: AUTH_OTP_VERIFY_SUCCESS, payload: data
        })
        document.location.href = "/profile"
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message
        if (message === USER_NOT_AUTHORIZED_ERROR) {
            dispatch(logout())
        }
        dispatch({
            type: AUTH_OTP_VERIFY_FAIL, payload: message
        })
    }
}
