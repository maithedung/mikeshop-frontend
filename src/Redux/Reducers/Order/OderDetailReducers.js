import {ORDER_DETAIL_FAIL, ORDER_DETAIL_REQUEST, ORDER_DETAIL_SUCCESS} from "../../Constants/Order/OrderDetailConstants";

export const orderDetailReducer = (state = {loading: true, orderItems: [], shippingAddress: {}}, action) => {
    switch (action.type) {
        case ORDER_DETAIL_REQUEST:
            return {
                ...state, loading: true
            }
        case ORDER_DETAIL_SUCCESS:
            return {
                loading: false, success: true, order: action.payload
            }
        case ORDER_DETAIL_FAIL:
            return {
                loading: false, error: action.payload
            }
        default:
            return state
    }
}
