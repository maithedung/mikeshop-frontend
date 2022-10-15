import {
    PRODUCT_LIST_FAIL, PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS
} from "../../Constants/Product/ProductListConstants";
import axios from "axios";
import {URL} from "../../Url";

export const listProduct = (keyword = "", pageNumber = "") => async (dispatch) => {
    try {
        dispatch({
            type: PRODUCT_LIST_REQUEST
        })
        const {data} = await axios.get(`${URL}/api/products?keyword=${keyword}&pageNumber=${pageNumber}`)
        dispatch({
            type: PRODUCT_LIST_SUCCESS, payload: data
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}