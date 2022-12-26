import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import Toast from "../Toast/Toast";
import Message from "../Error/Error";
import Loading from "../Loading/Loading";
import {toast} from "react-toastify";
import {updateUserProfile} from "../../Redux/Actions/User/UserUpdateActions";

const ProfileTabs = () => {
    const dispatch = useDispatch()

    const toastId = useRef(null)
    const toastObject = {
        pauseOnFocusLoss: false, draggable: false, pauseOnExit: false, autoClose: 2000
    }

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const userDetail = useSelector((state) => state.userDetail)
    const {loading, error, user} = userDetail
    const userUpdateProfile = useSelector((state) => state.userUpdate)
    const {loading: updateLoading} = userUpdateProfile

    const submitHandler = (e) => {
        e.preventDefault()
        console.log(toastId.current)
        toastId.current = null
        //    Password match
        if (password !== confirmPassword) {
            if (!toast.isActive(toastId.current)) {
                toastId.current = toast.error("Password does not match", toastObject)
            }
        } else {
            //    Update profile
            if (!toast.isActive(toastId.current)) {
                toastId.current = toast.success("Profile updated", toastObject)
            }
            dispatch(updateUserProfile({id: user._id, name, email, password}))
        }
    }

    useEffect(() => {
        if (user) {
            setName(user.name)
            setEmail(user.email)
        }
    }, [user])

    return (<>
        <Toast/>
        {error && <Message variant="alert-danger">{error}</Message>}
        {loading && <Loading/>}
        {updateLoading && <Loading/>}
        <form className="row  form-container" onSubmit={submitHandler}>
            <div className="col-md-6">
                <div className="form">
                    <label htmlFor="account-fn">UserName</label>
                    <input className="form-control" type="text" required
                           value={name}
                           onChange={(e) => setName(e.target.value)}/>
                </div>
            </div>

            <div className="col-md-6">
                <div className="form">
                    <label htmlFor="account-email">E-mail Address</label>
                    <input className="form-control" type="email" required
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}/>
                </div>
            </div>
            <div className="col-md-6">
                <div className="form">
                    <label htmlFor="account-pass">New Password</label>
                    <input className="form-control" type="password" required
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}/>
                </div>
            </div>
            <div className="col-md-6">
                <div className="form">
                    <label htmlFor="account-confirm-pass">Confirm Password</label>
                    <input className="form-control" type="password" required
                           value={confirmPassword}
                           onChange={(e) => setConfirmPassword(e.target.value)}/>
                </div>
            </div>
            <button type="submit">Update Profile</button>
        </form>
    </>);
};

export default ProfileTabs;
