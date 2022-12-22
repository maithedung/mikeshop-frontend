import {USER_SEARCH_FAIL, USER_SEARCH_REQUEST, USER_SEARCH_SUCCESS} from "../../Constants/Chat/UserSearchConstants";


export const userSearchReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_SEARCH_REQUEST:
            return {
                loading: true
            }
        case USER_SEARCH_SUCCESS:
            return {
                loading: false, success: true, userListInfo: action.payload
            }
        case USER_SEARCH_FAIL:
            return {
                loading: false, error: action.payload
            }
        default:
            return state
    }
}
