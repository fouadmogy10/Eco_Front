import { BsFillHeartbreakFill } from "react-icons/bs";
import { AiFillStar, AiOutlineStar, AiTwotoneHeart } from "react-icons/ai";
import React, { useEffect } from "react";
import { FaEye } from "react-icons/fa6";
import "./product.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist } from "../../features/auth/authSlice";
import { Spinner } from "react-bootstrap";
import { useState } from "react";
import { toast } from "react-toastify";
function ProductCard({ ke, data, id, tag }) {
  const [loader, setloader] = useState();
  const dispatch = useDispatch();
  const { user, Wishlist } = useSelector((state) => state.auth);

  const [isFav, setisFav] = useState(false);
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
  return (
    <div className="product" key={ke}>
      <div className="product-img">
        <img
          loading="lazy"
          alt={data?.title}
          src={data?.images[0].url}
          style={{
            objectFit: "contain",
            aspectRatio: 1,
          }}
        />
        <div className="product-label">
          <span className="new">{tag}</span>
        </div>
      </div>
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
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
