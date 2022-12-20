import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Header from "./../components/Header";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../Redux/Actions/User/UserLoginActions";
import Message from "../components/LoadingError/Error";
import Loading from "../components/LoadingError/Loading";

const LoginScreen = ({location, history}) => {
    window.scrollTo(0, 0);
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const dispatch = useDispatch()
    const redirect = location.search ? location.search.split("=")[1] : "/"
    const validate2FA = '/validate'

    const userLogin = useSelector((state) => state.userLogin)
    const {error, loading, userInfo} = userLogin

    useEffect(() => {
        if (userInfo) {
            if (userInfo.otp_enabled && userInfo.otp_verified) {
                history.push(validate2FA)
            } else {
                history.push(redirect)
            }
        }
    }, [userInfo, history, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }

    return (<>
        <Header/>
        <div className="container d-flex flex-column justify-content-center align-items-center login-center">
            {error && <Message variant="alert-danger">{error}</Message>}
            {loading && <div className="mb-5"><Loading/></div>}
            <form className="Login col-md-8 col-lg-4 col-11" onSubmit={submitHandler}>
                <input type="email" placeholder="Email"
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" placeholder="Password"
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}/>
                <button type="submit">Login</button>
                <p>
                    <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>Create Account</Link>
                </p>
            </form>
        </div>
    </>);
};

export default LoginScreen;
