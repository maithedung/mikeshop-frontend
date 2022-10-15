import {
    REVIEW_CREATE_FAIL, REVIEW_CREATE_REQUEST, REVIEW_CREATE_RESET, REVIEW_CREATE_SUCCESS
} from "../../Constants/Review/ReviewCreateConstants";

export const reviewCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case REVIEW_CREATE_REQUEST:
            return {
                ...state, loading: true
            }
        case REVIEW_CREATE_SUCCESS:
            return {
                loading: false, success: true
            }
        case REVIEW_CREATE_FAIL:
            return {
                loading: false, error: action.payload
            }
        case REVIEW_CREATE_RESET:
            return {}
        default:
            return state
    }
}