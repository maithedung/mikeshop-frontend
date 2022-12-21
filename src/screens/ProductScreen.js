import React, {useEffect, useState} from "react";
import Header from "./../components/Header";
import Rating from "../components/Home/Rating";
import {Link} from "react-router-dom";
import Message from "./../components/LoadingError/Error";
import {useDispatch, useSelector} from "react-redux";
import {detailProduct} from "../Redux/Actions/Product/ProductDetailActions";
import Loading from "../components/LoadingError/Loading";
import {REVIEW_CREATE_RESET} from "../Redux/Constants/Review/ReviewCreateConstants";
import moment from "moment";
import {createReview} from "../Redux/Actions/Review/ReviewCreateActions";
import {toast} from "react-toastify";
import Toast from "../components/LoadingError/Toast";

const ProductScreen = ({history, match}) => {
    const dispatch = useDispatch()

    const [quantity, setQuantity] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState("")

    const productId = match.params.id
    const productDetail = useSelector((state) => state.productDetail)
    const {loading, error, product} = productDetail
    const userLogin = useSelector((state) => state.userLogin)
    const {userInfo} = userLogin
    const reviewCreate = useSelector((state) => state.reviewCreate)
    const {loading: loadingCreateReview, error: errorCreateReview, success: successCreateReview} = reviewCreate

    const toastId = React.useRef(null)
    const toastObject = {
        pauseOnFocusLoss: false, draggable: false, pauseOnExit: false, autoClose: 2000
    }

    useEffect(() => {
        if (successCreateReview) {
            setRating(0)
            setComment("")
            dispatch({type: REVIEW_CREATE_RESET})
        }
        dispatch(detailProduct(productId))
    }, [dispatch, productId, successCreateReview])

    const AddToCartHandle = (e) => {
        e.preventDefault()
        history.push(`/cart/${productId}?quantity=${quantity}`)
    }

    const submitHandler = (e) => {
        e.preventDefault()

        //    Create review
        dispatch(createReview(productId, {
            rating, comment
        }))
        if (!toast.isActive(toastId.current)) {
            toastId.current = toast.success("Review submitted", toastObject)
        }
    }
    return (<>
        <Header/>
        <div className="container single-product">
            {loading ? (<Loading/>) : error ? (<Message variant="alert-danger">{error}</Message>) : (<>
                <div className="row">
                    <div className="col-md-6">
                        <div className="single-image">
                            <img src={product.image} alt={product.name}/>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="product-dtl">
                            <div className="product-info">
                                <div className="product-name">{product.name}</div>
                            </div>
                            <p>{product.description}</p>

                            <div className="product-count col-lg-7 ">
                                <div
                                    className="flex-box d-flex justify-content-between align-items-center">
                                    <h6>Price</h6>
                                    <span>${product.price}</span>
                                </div>
                                <div
                                    className="flex-box d-flex justify-content-between align-items-center">
                                    <h6>Status</h6>
                                    {product.countInStock > 0 ? (<span>In Stock</span>) : (<span>unavailable</span>)}
                                </div>
                                <div
                                    className="flex-box d-flex justify-content-between align-items-center">
                                    <h6>Reviews</h6>
                                    <Rating
                                        value={product.rating}
                                        text={`${product.numReviews} reviews`}
                                    />
                                </div>
                                {product.countInStock > 0 ? (<>
                                    <div
                                        className="flex-box d-flex justify-content-between align-items-center">
                                        <h6>Quantity</h6>
                                        <select value={quantity} onChange={(e) => setQuantity(e.target.value)}>
                                            {[...Array(product.countInStock).keys()].map((x) => (
                                                <option key={x + 1} value={x + 1}>
                                                    {x + 1}
                                                </option>))}
                                        </select>
                                    </div>
                                    <button onClick={AddToCartHandle} className="round-black-btn">Add To Cart</button>
                                </>) : null}
                            </div>
                        </div>
                    </div>
                </div>

                {/* RATING */}
                <div className="row my-5">
                    <div className="col-md-6">
                        <h6 className="mb-3">REVIEWS</h6>
                        {product.reviews.length === 0 && (<Message variant={"alert-info mt-3"}>No Reviews</Message>)}
                        {product.reviews.map((review) => (
                            <div className="mb-5 mb-md-3 bg-light p-3 shadow-sm rounded" key={review._id}>
                                <strong>{review.name}</strong>
                                <Rating value={review.rating}/>
                                <span>{moment(review.createdAt).calendar()}</span>
                                <div className="alert alert-info mt-3">
                                    {review.comment}
                                </div>
                            </div>))}
                    </div>
                    <div className="col-md-6">
                        <h6>WRITE A CUSTOMER REVIEW</h6>
                        <div className="my-4">
                            {loadingCreateReview && <Loading/>}
                            {errorCreateReview && (<Message variant="alert-danger">{errorCreateReview}</Message>)}
                        </div>
                        {userInfo ? (<>
                            <Toast/>
                            <form onSubmit={submitHandler}>
                                <div className="my-4">
                                    <strong>Rating</strong>
                                    <select className="col-12 bg-light p-3 mt-2 border-0 rounded"
                                            value={rating}
                                            onChange={(e) => setRating(e.target.value)}>
                                        <option value="">Select...</option>
                                        <option value="1">1 - Poor</option>
                                        <option value="2">2 - Fair</option>
                                        <option value="3">3 - Good</option>
                                        <option value="4">4 - Very Good</option>
                                        <option value="5">5 - Excellent</option>
                                    </select>
                                </div>
                                <div className="my-4">
                                    <strong>Comment</strong>
                                    <textarea
                                        row="3"
                                        className="col-12 bg-light p-3 mt-2 border-0 rounded"
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                    ></textarea>
                                </div>
                                <div className="my-3">
                                    <button className="col-12 bg-black border-0 p-3 rounded text-white"
                                            disabled={loadingCreateReview}>
                                        SUBMIT
                                    </button>
                                </div>
                            </form>
                        </>) : (<div className="my-3">
                            <Message variant={"alert-warning"}>
                                Please{" "}
                                <Link to="/login">
                                    " <strong>Login</strong> "
                                </Link>{" "}
                                to write a review{" "}
                            </Message>
                        </div>)}
                    </div>
                </div>
            </>)}
        </div>
    </>);
};

export default ProductScreen;
