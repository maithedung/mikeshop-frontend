import axios from "axios";
import {URL} from "../../Url";
import {
    AUTH_OTP_GENERATE_FAIL, AUTH_OTP_GENERATE_REQUEST, AUTH_OTP_GENERATE_SUCCESS
} from "../../Constants/Auth/AuthOtpGenerateConstants";
import {logout} from "../User/UserLogoutActions";
import {USER_NOT_AUTHORIZED_ERROR} from "../../Messages";

export const generateAuthOtp = (userId, email) => async (dispatch, getState) => {
    try {
        dispatch({
            type: AUTH_OTP_GENERATE_REQUEST
        })
        const {
            userLogin: {userInfo}
        } = getState()

        const config = {
            headers: {
                "Content-Type": "application/json", "Authorization": `Bearer ${userInfo.token}`
            }
        }

        const authData = {userId: userId, email: email}

        const {data} = await axios.post(`${URL}/api/auth/otp/generate`, authData, config)
        dispatch({
            type: AUTH_OTP_GENERATE_SUCCESS, payload: data
        })

    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message
        if (message === USER_NOT_AUTHORIZED_ERROR) {
            dispatch(logout())
        }
        dispatch({
            type: AUTH_OTP_GENERATE_FAIL, payload: message
        })
    }
}
