import {
    PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS
} from "../../Constants/Product/ProductListConstants";
import axios from "axios";
import {PRODUCT_URL} from "../../Url";

export const listProduct = (keyword = "", pageNumber = "") => async (dispatch) => {
    try {
        dispatch({
            type: PRODUCT_LIST_REQUEST
        })
        const {data} = await axios.get(`${PRODUCT_URL}?keyword=${keyword}&pageNumber=${pageNumber}`)
        dispatch({
            type: PRODUCT_LIST_SUCCESS, payload: data
        })
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message
        dispatch({
            type: PRODUCT_LIST_FAIL, payload: message
        })
    }
}
