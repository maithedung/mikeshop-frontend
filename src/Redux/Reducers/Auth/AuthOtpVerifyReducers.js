import {
    AUTH_OTP_VERIFY_FAIL, AUTH_OTP_VERIFY_REQUEST, AUTH_OTP_VERIFY_SUCCESS
} from "../../Constants/Auth/AuthOtpVerifyConstants";

export const authOtpVerifyReducer = (state = {}, action) => {
    switch (action.type) {
        case AUTH_OTP_VERIFY_REQUEST:
            return {
                loading: true
            }
        case AUTH_OTP_VERIFY_SUCCESS:
            return {
                loading: false, success: true, data: action.payload
            }
        case AUTH_OTP_VERIFY_FAIL:
            return {
                loading: false, error: action.payload
            }
        default:
            return state
    }
}
