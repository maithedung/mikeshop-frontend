import axios from "axios";
import {logout} from "../User/UserLogoutActions";
import {
    REVIEW_CREATE_FAIL, REVIEW_CREATE_REQUEST, REVIEW_CREATE_SUCCESS
} from "../../Constants/Review/ReviewCreateConstants";
import {PRODUCT_URL} from "../../Url";
import {USER_NOT_AUTHORIZED_ERROR} from "../../Messages";

export const createReview = (productId, review) => async (dispatch, getState) => {
    try {
        dispatch({
            type: REVIEW_CREATE_REQUEST
        })
        const {
            userLogin: {userInfo}
        } = getState()

        const config = {
            headers: {
                "Content-Type": "application/json", "Authorization": `Bearer ${userInfo.token}`
            }
        }

        await axios.post(`${PRODUCT_URL}/${productId}/review`, review, config)
        dispatch({
            type: REVIEW_CREATE_SUCCESS
        })
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message
        if (message === USER_NOT_AUTHORIZED_ERROR) {
            dispatch(logout())
        }
        dispatch({
            type: REVIEW_CREATE_FAIL, payload: message
        })
    }
}
