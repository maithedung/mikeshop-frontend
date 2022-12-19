import {
    AUTH_OTP_DISABLE_FAIL, AUTH_OTP_DISABLE_REQUEST, AUTH_OTP_DISABLE_SUCCESS
} from "../../Constants/Auth/AuthOtpDisableConstants";

export const authOtpDisableReducer = (state = {}, action) => {
    switch (action.type) {
        case AUTH_OTP_DISABLE_REQUEST:
            return {
                loading: true
            }
        case AUTH_OTP_DISABLE_SUCCESS:
            return {
                loading: false, success: true, data: action.payload
            }
        case AUTH_OTP_DISABLE_FAIL:
            return {
                loading: false, error: action.payload
            }
        default:
            return state
    }
}
