import {PRODUCT_DETAIL_FAIL, PRODUCT_DETAIL_REQUEST, PRODUCT_DETAIL_SUCCESS} from "../../Constants/Product/ProductDetailConstants";

export const productDetailReducer = (state = {product: {reviews:[]}}, action) => {
    switch (action.type) {
        case PRODUCT_DETAIL_REQUEST:
            return {
                ...state, loading: true
            }
        case PRODUCT_DETAIL_SUCCESS:
            return {
                loading: false, product: action.payload
            }
        case PRODUCT_DETAIL_FAIL:
            return {
                loading: false, error: action.payload
            }
        default:
            return state
    }
}