import {
    AUTH_OTP_GENERATE_FAIL, AUTH_OTP_GENERATE_REQUEST, AUTH_OTP_GENERATE_SUCCESS
} from "../../Constants/Auth/AuthOtpGenerateConstants";

export const authOtpGenerateReducer = (state = {}, action) => {
    switch (action.type) {
        case AUTH_OTP_GENERATE_REQUEST:
            return {
                loading: true
            }
        case AUTH_OTP_GENERATE_SUCCESS:
            return {
                loading: false, success: true, data: action.payload
            }
        case AUTH_OTP_GENERATE_FAIL:
            return {
                loading: false, error: action.payload
            }
        default:
            return state
    }
}
