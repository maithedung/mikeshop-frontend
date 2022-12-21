import {
    AUTH_OTP_VALIDATE_FAIL, AUTH_OTP_VALIDATE_REQUEST, AUTH_OTP_VALIDATE_SUCCESS
} from "../../Constants/Auth/AuthOtpValidateConstants";

export const authOtpValidateReducer = (state = {}, action) => {
    switch (action.type) {
        case AUTH_OTP_VALIDATE_REQUEST:
            return {
                loading: true
            }
        case AUTH_OTP_VALIDATE_SUCCESS:
            return {
                loading: false, success: true, data: action.payload
            }
        case AUTH_OTP_VALIDATE_FAIL:
            return {
                loading: false, error: action.payload
            }
        default:
            return state
    }
}
