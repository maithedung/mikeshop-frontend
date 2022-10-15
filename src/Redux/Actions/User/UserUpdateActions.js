import axios from "axios";
import {USER_UPDATE_FAIL, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS} from "../../Constants/User/UserUpdateConstants";
import {USER_LOGIN_SUCCESS} from "../../Constants/User/UserLoginConstants";
import {logout} from "./UserLogoutActions";
import {URL} from "../../Url";

export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPDATE_REQUEST
        })
        const {
            userLogin: {userInfo}
        } = getState()

        const config = {
            headers: {
                "Content-Type": "application/json", "Authorization": `Bearer ${userInfo.token}`
            }
        }

        const {data} = await axios.put(`${URL}/api/users/profile`, user, config)
        dispatch({
            type: USER_UPDATE_SUCCESS, payload: data
        })
        dispatch({
            type: USER_LOGIN_SUCCESS, payload: data
        })

        localStorage.setItem("userInfo", JSON.stringify(data))
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message
        if (message === "Not authorized. Token failed!") {
            dispatch(logout())
        }
        dispatch({
            type: USER_UPDATE_FAIL, payload: message
        })
    }
}