import React from "react";
import "./App.css";
import "./responsive.css";
import "react-toastify/dist/ReactToastify.css";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import SingleProduct from "./screens/SingleProduct";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import CartScreen from "./screens/CartScreen";
import ShippingScreen from "./screens/ShippingScreen";
import ProfileScreen from "./screens/ProfileScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import NotFound from "./screens/NotFound";
import PrivateRouter from "./PrivateRouter";
import ValidateScreen from "./screens/ValidateScreen";

const App = () => {
    return (<Router>
        <Switch>
            <Route path="/" component={HomeScreen} exact/>
            <Route path="/search/:keyword" component={HomeScreen}/>
            <Route path="/search/:keyword/page/:pageNumber" component={HomeScreen}/>
            <Route path="/page/:pageNumber" component={HomeScreen}/>
            <Route path="/products/:id" component={SingleProduct}/>
            <Route path="/login" component={LoginScreen}/>
            <Route path="/register" component={RegisterScreen}/>
            <PrivateRouter path="/profile" component={ProfileScreen}/>
            <PrivateRouter path="/validate" component={ValidateScreen}/>
            <Route path="/cart/:id?" component={CartScreen}/>
            <PrivateRouter path="/shipping" component={ShippingScreen}/>
            <PrivateRouter path="/payment" component={PaymentScreen}/>
            <PrivateRouter path="/placeOrder" component={PlaceOrderScreen}/>
            <PrivateRouter path="/order/:id" component={OrderScreen}/>
            <Route path="*" component={NotFound}/>
        </Switch>
    </Router>);
};

export default App;
