import React, {useState} from "react";
import {Link, useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout} from "../../Redux/Actions/User/UserLogoutActions";
import TopHeader from "./TopHeader";
import {MIKE_CHAT} from "../../Redux/Url";

const Header = () => {
    const dispatch = useDispatch()
    let history = useHistory()

    const [keyword, setKeyword] = useState()

    const cart = useSelector((state) => state.cart)
    const {cartItems} = cart
    const userLogin = useSelector((state) => state.userLogin)
    const {userInfo} = userLogin

    const logoutHandler = () => {
        dispatch(logout())
    }

    const submitHandler = (e) => {
        e.preventDefault()
        if (keyword.trim()) {
            history.push(`/search/${keyword}`)
        } else {
            history.push("/")
        }
    }

    return (<div>
        {/* Top Header */}
        <TopHeader/>
        {/* Header */}
        <div className="header">
            <div className="container">
                {/* MOBILE HEADER */}
                <div className="mobile-header">
                    <div className="container ">
                        <div className="row ">
                            <div className="col-6 d-flex align-items-center">
                                <Link className="navbar-brand" to="/">
                                    <img alt="logo" src="/images/logo.png"/>
                                </Link>
                            </div>
                            <div className="col-6 d-flex align-items-center justify-content-end Login-Register">
                                {userInfo ? (<div className="btn-group">
                                    <button
                                        type="button"
                                        className="name-button dropdown-toggle"
                                        data-toggle="dropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                    >
                                        <i className="fas fa-user"></i>
                                    </button>
                                    <div className="dropdown-menu">
                                        <Link className="dropdown-item" to="/profile">
                                            Profile
                                        </Link>

                                        <Link className="dropdown-item" to="#"
                                              onClick={logoutHandler}>
                                            Logout
                                        </Link>
                                    </div>
                                </div>) : (<div className="btn-group">
                                    <button
                                        type="button"
                                        className="name-button dropdown-toggle"
                                        data-toggle="dropdown"
                                        aria-haspopup="true"
                                        aria-expanded="false"
                                    >
                                        <i className="fas fa-user"></i>
                                    </button>
                                    <div className="dropdown-menu">
                                        <Link className="dropdown-item" to="/login">
                                            Login
                                        </Link>
                                        <Link className="dropdown-item" to="/register">
                                            Register
                                        </Link>
                                    </div>
                                </div>)}
                                <a href={MIKE_CHAT} className="mobile-icon">
                                    <i className="fas fa-comment"></i>
                                    <span className="badge">{cartItems.length}</span>
                                </a>
                                <Link to="/cart" className="mobile-icon">
                                    <i className="fas fa-shopping-bag"></i>
                                    <span className="badge">{cartItems.length}</span>
                                </Link>
                            </div>
                            <div className="col-12 d-flex align-items-center">
                                <form className="input-group" onSubmit={submitHandler}>
                                    <input
                                        type="search"
                                        className="form-control rounded search"
                                        placeholder="Search"
                                        onChange={(e) => setKeyword(e.target.value)}
                                    />
                                    <button type="submit" className="search-button">
                                        search
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                {/* PC HEADER */}
                <div className="pc-header">
                    <div className="row">
                        <div className="col-md-3 col-4 d-flex align-items-center">
                            <Link className="navbar-brand" to="/">
                                <img alt="logo" src="/images/logo.png"/>
                            </Link>
                        </div>
                        <div className="col-md-6 col-8 d-flex align-items-center">
                            <form className="input-group" onSubmit={submitHandler}>
                                <input
                                    type="search"
                                    className="form-control rounded search"
                                    placeholder="Search"
                                    onChange={(e) => setKeyword(e.target.value)}
                                />
                                <button type="submit" className="search-button">
                                    search
                                </button>
                            </form>
                        </div>
                        <div className="col-md-3 d-flex align-items-center justify-content-end Login-Register">
                            {userInfo ? (<div className="btn-group">
                                <button
                                    type="button"
                                    className="name-button dropdown-toggle"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                    Hi, {userInfo.name}
                                </button>
                                <div className="dropdown-menu">
                                    <Link className="dropdown-item" to="/profile">
                                        Profile
                                    </Link>

                                    <Link className="dropdown-item" to="#"
                                          onClick={logoutHandler}>
                                        Logout
                                    </Link>
                                </div>
                            </div>) : (<>
                                <Link to="/register">
                                    Register
                                </Link>
                                <Link to="/login">
                                    Login
                                </Link>
                            </>)}
                            <a href={MIKE_CHAT}>
                                <i className="fas fa-comment"></i>
                            </a>
                            <Link to="/cart">
                                <i className="fas fa-shopping-bag"></i>
                                <span className="badge">{cartItems.length}</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>);
};

export default Header;
