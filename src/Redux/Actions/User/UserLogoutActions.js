import {USER_DETAIL_RESET} from "../../Constants/User/UserDetailConstants";
import {USER_LOGOUT} from "../../Constants/User/UserLogoutConstants";
import {ORDER_LIST_RESET} from "../../Constants/Order/OrderListConstants";

export const logout = () => async (dispatch) => {
    localStorage.removeItem("userInfo")
    dispatch({
        type: USER_LOGOUT
    })
    dispatch({
        type: USER_DETAIL_RESET
    })
    dispatch({
        type: ORDER_LIST_RESET
    })
    document.location.href = "/login"
}