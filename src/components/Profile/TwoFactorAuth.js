import React, {useEffect, useState} from "react";
import QRCode from "qrcode";
import {toast} from "react-toastify";
import {verifyAuthOtp} from "../../Redux/Actions/Auth/AuthOtpVerifyActions";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../Redux/Actions/User/UserLogoutActions";

const styles = {
    heading3: `text-xl font-semibold text-gray-900 p-4 border-b`,
    heading4: `text-[#16a34a] text-ct-green-600 font-medium border-b mb-2`,
    modalOverlay: `overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full`,
    orderedList: `space-y-1 text-sm list-decimal`,
    buttonGroup: `flex items-center py-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600`,
    buttonGreen: `text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800`,
    buttonGrey: `text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-green-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600`,
    inputField: `bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-2/5 p-2.5`,
};

const TwoFactorAuth = (props) => {
    const {otpauth_url, base32, user_id, closeModal} = props
    const [qrcodeUrl, setQrcodeUrl] = useState("");
    const [token, setToken] = useState("")

    const toast2FA = React.useRef(null)
    const toastObject = {
        pauseOnFocusLoss: false, draggable: false, pauseOnExit: false, autoClose: 2000
    }

    const authOtpVerify = useSelector((state) => state.authOtpVerify)
    const {data} = authOtpVerify

    const dispatch = useDispatch()

    useEffect(() => {
        QRCode.toDataURL(otpauth_url).then(setQrcodeUrl);
    }, [dispatch, data])

    const submitHandler = (e) => {
        e.preventDefault()

        //    Token required
        if (token) {
            dispatch(verifyAuthOtp(user_id, token))
            const {otp_enabled, otp_verified} = data
            if (otp_enabled && otp_verified) {
                if (!toast.isActive(toast2FA.current)) {
                    toast2FA.current = toast.success("Two-Factor Auth Enabled Successfully", toastObject)
                }
                closeModal();
            } else {
                if (!toast.isActive(toast2FA.current)) {
                    toast2FA.current = toast.warning("Authentication code is wrong!", toastObject)
                }
            }
        } else {
            if (!toast.isActive(toast2FA.current)) {
                toast2FA.current = toast.error("Authentication code is required", toastObject)
            }
        }
    };

    return (<div
        aria-hidden={true}
        className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full bg-[#222] bg-opacity-50"
        // onClick={closeModal}
    >
        <div className="relative p-4 w-full max-w-xl h-full md:h-auto left-1/2 -translate-x-1/2">
            <div className="relative bg-white rounded-lg shadow">
                <h3 className={styles.heading3}>Two-Factor Authentication (2FA)</h3>
                {/* Modal body */}
                <div className="p-6 space-y-4">
                    <h4 className={styles.heading4}>
                        Configuring Google Authenticator or Authy
                    </h4>
                    <div className={styles.orderedList}>
                        <li>
                            Install Google Authenticator (IOS - Android) or Authy (IOS -
                            Android).
                        </li>
                        <li>In the authenticator app, select "+" icon.</li>
                        <li>
                            Select "Scan a barcode (or QR code)" and use the phone's camera
                            to scan this barcode.
                        </li>
                    </div>
                    <div>
                        <h4 className={styles.heading4}>Scan QR Code</h4>
                        <div className="flex justify-center">
                            <img
                                className="block w-64 h-64 object-contain"
                                src={qrcodeUrl}
                                alt="qrcode url"
                            />
                        </div>
                    </div>
                    <div>
                        <h4 className={styles.heading4}>Or Enter Code Into Your App</h4>
                        <p className="text-sm">SecretKey: {base32} (Base32 encoded)</p>
                    </div>
                    <div>
                        <h4 className={styles.heading4}>Verify Code</h4>
                        <p className="text-sm">
                            For changing the setting, please verify the authentication code:
                        </p>
                    </div>
                    <form onSubmit={submitHandler}>
                        <input
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-2/4 p-2.5"
                            placeholder="Authentication Code"
                            type="number"
                            value={token}
                            onChange={(e) => setToken(e.target.value)}
                        />
                        <p className="mt-2 text-xs text-red-600">
                            {/*{errors.token ? errors.token.message : null}*/}
                        </p>

                        <div className={styles.buttonGroup} style={{borderColor: "#e5e7eb"}}>
                            <button
                                type="button"
                                onClick={closeModal}
                                className={styles.buttonGrey}
                            >
                                Close
                            </button>
                            <button type="submit" className={styles.buttonGreen}>
                                Verify & Activate
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>);
}

export default TwoFactorAuth;
