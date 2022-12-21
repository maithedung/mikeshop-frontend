import axios from "axios";
import {USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS} from "../../Constants/User/UserLoginConstants";
import {LOGIN_URL} from "../../Url";

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        const loginData = {email, password}

        const {data} = await axios.post(LOGIN_URL, loginData, config)
        dispatch({
            type: USER_LOGIN_SUCCESS, payload: data
        })

        localStorage.setItem("userInfo", JSON.stringify(data))
    } catch (error) {
        const message = error.response && error.response.data.message ? error.response.data.message : error.message
        dispatch({
            type: USER_LOGIN_FAIL, payload: message
        })
    }
}
