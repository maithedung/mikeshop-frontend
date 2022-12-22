import {USER_LOGOUT} from "../../Constants/User/UserLogoutConstants";

export const userLogoutReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGOUT:
            return {
                success: true
            }
        default:
            return state
    }
}
