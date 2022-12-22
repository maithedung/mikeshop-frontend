import React, {useEffect, useRef, useState} from "react";
import Header from "../components/Header/Header";
import {useDispatch, useSelector} from "react-redux";
import Message from "../components/Error/Error";
import Loading from "../components/Loading/Loading";
import {validateAuthOtp} from "../Redux/Actions/Auth/AuthOtpValidateActions";
import {toast} from "react-toastify";

const ValidateScreen = ({location, history}) => {
    window.scrollTo(0, 0);

    const dispatch = useDispatch()
    const toastId = useRef(null)
    const toastObject = {
        pauseOnFocusLoss: false, draggable: false, pauseOnExit: false, autoClose: 2000
    }

    const redirect = location.search ? location.search.split("=")[1] : "/"

    const [token, setToken] = useState("")

    const userLogin = useSelector((state) => state.userLogin)
    const {error, loading, userInfo} = userLogin
    const authOtpValidate = useSelector((state) => state.authOtpValidate)
    const {data} = authOtpValidate

    const submitHandler = (e) => {
        e.preventDefault()
        const user_id = userInfo._id
        console.log(token)

        if (token) {
            dispatch(validateAuthOtp(user_id, token))
            console.log(data)
            if (data) {
                console.log(data)
                const {otp_valid} = data
                if (otp_valid) {
                    history.push(redirect)
                }
            } else {
                if (!toast.isActive(toastId.current)) {
                    toastId.current = toast.warning("Authentication code is wrong!", toastObject)
                }
            }
        } else {
            if (!toast.isActive(toastId.current)) {
                toastId.current = toast.error("Authentication code is required", toastObject)
            }
        }
    }

    useEffect(() => {
        console.log(data)
    }, [dispatch, userInfo, history, redirect, data])

    return (<>
        <Header/>
        <div className="container d-flex flex-column justify-content-center align-items-center login-center">
            {error && <Message variant="alert-danger">{error}</Message>}
            {loading && <div className="mb-5"><Loading/></div>}
            <form className="Login col-md-8 col-lg-4 col-11" onSubmit={submitHandler}>
                <input type="number" placeholder="Code"
                       value={token}
                       onChange={(e) => setToken(e.target.value)}/>
                <button type="submit">Authenticate</button>
            </form>
        </div>
    </>);
};

export default ValidateScreen;
