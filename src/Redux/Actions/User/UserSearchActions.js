import axios from "axios";
import {logout} from "./UserLogoutActions";
import {SEARCH_USER_URL} from "../../Url";
import {USER_NOT_AUTHORIZED_ERROR} from "../../Messages";
import {USER_SEARCH_FAIL, USER_SEARCH_REQUEST, USER_SEARCH_SUCCESS} from "../../Constants/Chat/UserSearchConstants";

export const searchUser = (search) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_SEARCH_REQUEST
        })

        const {
            userLogin: {userInfo}
        } = getState()
        const config = {
            headers: {
                "Authorization": `Bearer ${userInfo.token}`
            }
        }
        const {data} = await axios.get(`${SEARCH_USER_URL}?search=${search}`, config)

        dispatch({
            type: USER_SEARCH_SUCCESS, payload: data
        })
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message
        if (message === USER_NOT_AUTHORIZED_ERROR) {
            dispatch(logout())
        }

        dispatch({
            type: USER_SEARCH_FAIL, payload: message
        })
    }
}
