import {createStore, combineReducers, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import {productListReducer} from "./Reducers/Product/ProductListReducers";
import {productDetailReducer} from "./Reducers/Product/ProductDetailReducers";
import {cartReducer} from "./Reducers/Cart/CartReducers";
import {userLoginReducer} from "./Reducers/User/UserLoginReducers";
import {userRegisterReducer} from "./Reducers/User/UserRegisterReducers";
import {userDetailReducer} from "./Reducers/User/UserDetailReducers";
import {userUpdateReducer} from "./Reducers/User/UserUpdateReducers";
import {orderCreateReducer} from "./Reducers/Order/OderCreateReducers";
import {userLogoutReducer} from "./Reducers/User/UserLogoutReducers";
import {orderDetailReducer} from "./Reducers/Order/OderDetailReducers";
import {orderPayReducer} from "./Reducers/Order/OrderPayReducers";
import {orderListReducer} from "./Reducers/Order/OrderListReducers";
import {reviewCreateReducer} from "./Reducers/Review/ReviewCreateReducers";

const reducer = combineReducers({
    productList: productListReducer,
    productDetail: productDetailReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userLogout: userLogoutReducer,
    userRegister: userRegisterReducer,
    userDetail: userDetailReducer,
    userUpdate: userUpdateReducer,
    orderCreate: orderCreateReducer,
    orderDetail: orderDetailReducer,
    orderPay: orderPayReducer,
    orderList: orderListReducer,
    reviewCreate: reviewCreateReducer
})

// CART
const cartItemsFromLocalStorage = localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : []

// LOGIN
const userInfoFromLocalStorage = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null

// SHIPPING ADDRESS
const shippingAddressFromLocalStorage = localStorage.getItem("shippingAddress") ? JSON.parse(localStorage.getItem("shippingAddress")) : {}

const initialState = {
    cart: {
        cartItems: cartItemsFromLocalStorage, shippingAddress: shippingAddressFromLocalStorage
    }, userLogin: {
        userInfo: userInfoFromLocalStorage
    }
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store