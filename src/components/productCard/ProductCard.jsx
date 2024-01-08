import { BsFillCartPlusFill } from "react-icons/bs";
import { BsFillHeartbreakFill } from "react-icons/bs";
import { AiFillStar, AiTwotoneHeart } from "react-icons/ai";
import React, { useEffect } from "react";
import { FaEye } from "react-icons/fa6";
import "./product.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist } from "../../features/auth/authSlice";
import { Spinner } from "react-bootstrap";
import { useState } from "react";
import { toast } from "react-toastify";
import cartService from "../../features/cart/cartService";
import Img from "../lazyLoadImage/Img";
function ProductCard({ ke, data, id, tag }) {
  const [selectedColor, setSelectedColor] = useState("");
  const [loader, setloader] = useState();
  const dispatch = useDispatch();
  const { user, Wishlist } = useSelector((state) => state.auth);

  const [color, setcolor] = useState("#333");

  useEffect(() => {
    if (Wishlist?.wishlist?.some((fItem) => fItem._id == id) == true) {
      setcolor("red");
    } else {
      setcolor("#333");
    }
  }, [Wishlist?.wishlist]);

  const addToWish = async (prodId) => {
    if (user?.userInfo?.token) {
      setloader(prodId);
      await dispatch(addToWishlist(prodId));
      setloader("rtetrt");
    } else {
      toast.warn("Please Login ");
    }
  };
  const addToCartHandler = (data) => {
    //check if color/size selected
    if (selectedColor == "") {
      return toast.error("Please select product color");
    }

    const cartItem = {
      _id: data?._id,
      name: data?.title,
      qty: 1,
      price: data?.price,
      description: data?.description,
      color: selectedColor,
      image: data?.images[0].url,
      totalPrice: data?.price,
    };
    dispatch(cartService.addOrderToCartaction(cartItem));

    return dispatch(cartService.getCartItemsFromLocalStorageAction());
  };
  return (
    <div className="product" key={ke}>
      <Link to={`/products/${id}`}>
        <div className="product-img">
          {/* <img
            loading="lazy"
            alt={data?.title}
            src={data?.images[0]?.url}
            style={{
              objectFit: "contain",
              aspectRatio: 1,
            }}
          /> */}
          <Img
          alt={data?.title}
          // className={}
          
          src={data?.images[0]?.url}
          />
          <div className="product-label">
            <span className="new">{tag}</span>
          </div>
        </div>
      </Link>
      <div className="product-body">
        <p className="product-category">{data?.category}</p>
        <h3 className="product-name">
          <Link to={`/products/${id}`} className="card-item-title">
            {data?.title}
          </Link>
        </h3>
        <h4 className="product-price">
          ${data?.price}
          {/* <del className="product-old-price">${price}</del> */}
        </h4>
        <div className="product-rating ">
          {[0, 1, 2, 3, 4].map((rating) => (
            <AiFillStar
              key={rating}
              color={+data?.totalrating > rating ? "rgb(255, 215, 0)" : "#666"}
              aria-hidden="true"
            />
          ))}
        </div>
        <ul className="colors ps-0 my-2 justify-content-center">
          {window.location.pathname !== "/wishlist"
            ? data?.color?.map((item, idx) => {
                return (
                  <li
                    onClick={() => setSelectedColor(item?.title)}
                    className={selectedColor == item?.title ? "active" : null}
                    role="button"
                    key={Math.random()}
                    style={{ backgroundColor: `${item?.title}` }}
                  ></li>
                );
              })
            : null}
        </ul>

        <div className="product-btns">
          <button
            aria-label="add-to-wishlist"
            className="add-to-wishlist"
            onClick={() => addToWish(id)}
          >
            {loader == id ? (
              <Spinner size="sm" animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : (
              <>
                {window.location.pathname == "/wishlist" ? (
                  <BsFillHeartbreakFill color={"#666"} />
                ) : (
                  <AiTwotoneHeart color={color} />
                )}
                <span className="tooltipp">
                  {window.location.pathname == "/wishlist"
                    ? "remove From wishlist"
                    : "add to wishlist"}
                </span>
              </>
            )}
          </button>

          <button aria-label="quick-view" className="quick-view">
            <Link to={`/products/${id}`}>
              <FaEye />
            </Link>
            <span className="tooltipp">quick view</span>
          </button>
          {window.location.pathname !== "/wishlist" && (
            <button
              aria-label="quick-view"
              className="quick-view"
              onClick={() => addToCartHandler(data)}
            >
              <BsFillCartPlusFill />
              <span className="tooltipp">Add To Cart</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
