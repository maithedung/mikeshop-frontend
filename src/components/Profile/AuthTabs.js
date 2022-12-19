import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Toast from "../LoadingError/Toast";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import {toast} from "react-toastify";
import TwoFactorAuth from "./TwoFactorAuth";
import {generateAuthOtp} from "../../Redux/Actions/Auth/AuthOtpGenerateActions";

const AuthTabs = () => {
    const [secret, setSecret] = useState({
        otpauth_url: "", base32: "",
    });
    const [openModal, setOpenModal] = useState(false);

    const userDetail = useSelector((state) => state.userDetail)
    const {loading, error, user} = userDetail
    const authOtpGenerate = useSelector((state) => state.authOtpGenerate)
    const {data} = authOtpGenerate

    const generateQrCode = () => {
        try {
            if (data) {
                setOpenModal(true);
                setSecret({
                    base32: data.base32, otpauth_url: data.otpauth_url,
                })
            }
            console.log(data)
        } catch (e) {

        }
    };

    const disableTwoFactorAuth = (user_id) => {

    };

    useEffect(() => {
        console.log(user)
    }, [data])
    return (<>
        <Toast/>
        {error && <Message variant="alert-danger">{error}</Message>}
        {loading && <Loading/>}
        <section className="bg-ct-blue-600  min-h-screen pt-10">
            <div
                className="max-w-4xl p-12 mx-auto bg-ct-dark-100 rounded-md h-[20rem] flex gap-20 justify-center items-start">
                <div>
                    <h3 className="text-2xl font-semibold">
                        Mobile App Authentication (2FA)
                    </h3>
                    <p className="mb-4">
                        Secure your account with TOTP two-factor authentication.
                    </p>
                    {user.otp_enabled ? (<button
                        type="button"
                        className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2"
                        onClick={() => disableTwoFactorAuth(user._id)}
                    >
                        Disable 2FA
                    </button>) : (<button
                        type="button"
                        className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 focus:outline-none"
                        onClick={() => generateQrCode()}
                    >
                        Setup 2FA
                    </button>)}

                </div>
            </div>
        </section>
        {openModal && (<TwoFactorAuth
            base32={secret.base32}
            otpauth_url={secret.otpauth_url}
            user_id={user._id}
            closeModal={() => setOpenModal(false)}
        />)}
    </>);
};

export default AuthTabs;
