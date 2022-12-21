import axios from "axios";
import {
    PRODUCT_DETAIL_FAIL, PRODUCT_DETAIL_REQUEST, PRODUCT_DETAIL_SUCCESS
} from "../../Constants/Product/ProductDetailConstants";
import {PRODUCT_URL} from "../../Url";

export const detailProduct = (id) => async (dispatch) => {
    try {
        dispatch({
            type: PRODUCT_DETAIL_REQUEST
        })
        const {data} = await axios.get(`${PRODUCT_URL}/${id}`)
        dispatch({
            type: PRODUCT_DETAIL_SUCCESS, payload: data
        })
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message
        dispatch({
            type: PRODUCT_DETAIL_FAIL, payload: message
        })
    }
}
