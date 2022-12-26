import {
    PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS
} from "../../Constants/Product/ProductListConstants";

export const productListReducer = (state = {products: []}, action) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return {
                loading: true, products: []
            }
        case PRODUCT_LIST_SUCCESS:
            return {
                loading: false,
                success: true,
                pages: action.payload.pages,
                page: action.payload.page,
                products: action.payload.products
            }
        case PRODUCT_LIST_FAIL:
            return {
                loading: false, error: action.payload
            }
        default:
            return state
    }
}
