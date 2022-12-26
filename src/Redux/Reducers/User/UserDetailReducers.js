import {
    USER_DETAIL_FAIL, USER_DETAIL_REQUEST, USER_DETAIL_RESET, USER_DETAIL_SUCCESS
} from "../../Constants/User/UserDetailConstants";

export const userDetailReducer = (state = {user: {}}, action) => {
    switch (action.type) {
        case USER_DETAIL_REQUEST:
            return {
                ...state, loading: true
            }
        case USER_DETAIL_SUCCESS:
            return {
                loading: false, success: true, user: action.payload
            }
        case USER_DETAIL_FAIL:
            return {
                loading: false, error: action.payload
            }
        case USER_DETAIL_RESET:
            return {
                user: {}
            }
        default:
            return state
    }
}
