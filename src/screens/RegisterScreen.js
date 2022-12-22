import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Header from "../components/Header/Header";
import {useDispatch, useSelector} from "react-redux";
import {register} from "../Redux/Actions/User/UserRegisterActions";
import Message from "../components/Error/Error";
import Loading from "../components/Loading/Loading";

const RegisterScreen = ({location, history}) => {
    window.scrollTo(0, 0);

    const dispatch = useDispatch()

    const redirect = location.search ? location.search.split("=")[1] : "/"

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const userRegister = useSelector((state) => state.userRegister)
    const {error, loading, userInfo} = userRegister

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(register(name, email, password))
    }

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [userInfo, history, redirect])

    return (<>
        <Header/>
        <div className="container d-flex flex-column justify-content-center align-items-center login-center">
            {error && <Message variant="alert-danger">{error}</Message>}
            {loading && <div className="mb-5"><Loading/></div>}
            <form className="Login col-md-8 col-lg-4 col-11" onSubmit={submitHandler}>
                <input type="text" placeholder="Username"
                       value={name}
                       onChange={(e) => setName(e.target.value)}/>
                <input type="email" placeholder="Email"
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}/>
                <input type="password" placeholder="Password"
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}/>
                <button type="submit">Register</button>
                <p>
                    <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
                        I Have Account <strong>Login</strong>
                    </Link>
                </p>
            </form>
        </div>
    </>);
};

export default RegisterScreen;
