import { BiLogOut } from "react-icons/bi";
import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import {
  FaCartFlatbed,
  FaEnvelope,
  FaPhone,
  FaRegHeart,
  FaSearchengin,
  FaUser,
} from "react-icons/fa6";
import logo from "../../assets/images/favicon.webp";
import "./Header.css";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrder,
  getWishlist,
  getcartItem,
  logout,
  reset,
} from "../../features/auth/authSlice";
import { BounceLoader } from "react-spinners";
import { Typeahead } from "react-bootstrap-typeahead";
import {
  getProducts,
  getSingleProduct,
} from "../../features/product/productSlice";
import { getBrands } from "../../features/brand/brandSlice";
import { getCategories } from "../../features/pcategory/pcategorySlice";
import cartService from "../../features/cart/cartService";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [paginate, setPaginate] = useState(true);
  const [ProdOpt, setProdOpt] = useState([]);
  const { isLoading, Wishlist, user } = useSelector(
    (state) => state.auth
  );
  const { products } = useSelector((state) => state.products);
  let Wishliststate = Wishlist.wishlist ? Wishlist.wishlist : [];



  useEffect(() => {
    let data = [];
    for (let index = 0; index < products?.length; index++) {
      const ele = products[index];
      data.push({ id: index, prod: ele?._id, name: ele?.title });
    }
    setProdOpt(data);
  }, [products]);


  //get cart items from store
  const { cartItems } = useSelector((state) => state?.carts);
  //calculate total price
  let sumTotalPrice = 0;
  sumTotalPrice = cartItems?.reduce((acc, current) => {
    return acc + current?.totalPrice;
  }, 0);
  useEffect(() => {
    dispatch(getProducts());
    dispatch(getBrands())
    dispatch(getCategories())
  }, []);

  useEffect(() => {
    if (user?.userInfo?.token) {
      dispatch(getWishlist());
      dispatch(cartService.getCartItemsFromLocalStorageAction());
      dispatch(getOrder());
    }
  }, [user?.userInfo?.token])
  
  return (
    <>
      <div className="super_container">
        <header className="header">
          <div className="top_bar">
            <div className="container">
              <div className="row flex-wrap">
                <div className="col d-flex flex-row justify-content-center flex-wrap">
                  <div className="top_bar_contact_item">
                    <div className="top_bar_icon text-white">
                      <FaPhone color="#e74821" />
                    </div>
                    +91 9823 132 111
                  </div>
                  <div className="top_bar_contact_item  me-2" >
                    <a href="mailto:fastsales@gmail.com">
                    <div className="top_bar_icon">
                      <FaEnvelope color="#e74821" />
                    </div>
                      contact@gmail.com
                    </a>
                  </div>
                  <div className="top_bar_content ml-auto">
                    <div className="top_bar_user ">
                      {user?.userInfo !== null ? (
                        <div className="dropdown my-2">
                          <button
                            className="btn btn-secondary dropdown-toggle bg-transparent border-0 p-0"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            style={{
                              
                            }}
                          >
                            <div className="user_icon">
                              <FaUser color="#e74821" />
                            </div>
                            {user?.userInfo?.firstname} {user?.userInfo?.lastname}
                          </button>
                          <ul className="dropdown-menu bg-dark text-center">
                            <li>
                              <Link
                                className="dropdown-item  p-1"
                                to="/profile"
                                style={{
                                  fontSize:"16px"
                                }}
                              >
                                My Profile
                              </Link>
                            </li>
                            <li>
                              <Link
                                className="dropdown-item  p-1"
                                to="/my-order"
                                style={{
                                  fontSize:"16px"
                                }}
                              >
                                My Orders
                              </Link>
                            </li>
                            <li className="d-flex justify-content-center">
                              <button
                                className="btn-def mt-1"
                                style={{
                                  borderRadius: "10px",
                                  padding: "7px 15px",
                                }}
                                onClick={async () => {
                                  await dispatch(logout());
                                  // dispatch(reset())
                                  // window.location.reload();
                                }}
                              >
                                Log Out{" "}
                               
                              </button>
                            </li>
                          </ul>
                        </div>
                      ) : (
                        <>
                          <div className="user_icon">
                            <FaUser color="#e74821" />
                          </div>
                          <div>
                            <Link to="/register">Register</Link>
                          </div>
                          <div>
                            <Link to="/login">Sign in</Link>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="header_main shadow-sm py-2">
            <div className="container">
              <div className="row">
                <div className="col-lg-2 col-sm-3 col-3 order-1">
                  <div className="logo_container">
                    <div className="logo">
                      <Link className="d-flex align-items-center" to={"/"}>
                        <img
                          loading="lazy"
                          alt=" img"
                          src={logo}
                          width={65}
                          height={50}
                        />
                        <span>ECO</span>
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="col-lg-6 col-12 order-lg-2 order-3 text-lg-left text-right">
                  <div className="header_search">
                    <div className="header_search_content">
                      <div className="header_search_form_container">
                        <form
                          action="!#"
                          className="header_search_form clearfix"
                        >
                          <Typeahead
                            id="id"
                            onPaginate={() => ""}
                            onChange={(selected) => {
                              if (typeof selected[0]?.prod !== "undefined") {
                                dispatch(getSingleProduct(selected[0]?.prod));
                                navigate(`/products/${selected[0]?.prod}`);
                              }
                            }}
                            options={ProdOpt}
                            paginate={paginate}
                            placeholder="Search..."
                            style={null}
                            labelKey={"name"}
                            minLength={2}
                          />
                        </form>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-lg-4 col-9 order-lg-3 order-2 text-lg-left text-right">
                  <div className="wishlist_cart d-flex flex-row align-items-center justify-content-end">
                    <div className="wishlist d-flex flex-row align-items-center justify-content-end">
                      <Link to="/wishlist">
                        <div className="wishlist_icon">
                          <FaRegHeart size={35} />
                        </div>
                      </Link>
                      <div className="wishlist_content">
                        <div className="wishlist_text">
                          <Link to="/wishlist">Wishlist</Link>
                        </div>
                        <div className="wishlist_count">
                          {Wishliststate.length}
                        </div>
                      </div>
                    </div>

                    <div className="cart">
                      <Link to="/cart">
                        <div className="cart_container d-flex flex-row align-items-center justify-content-end">
                          <div className="cart_icon">
                            <FaCartFlatbed size={35} />
                            <div className="cart_count">
                              <span>{cartItems.length}</span>
                            </div>
                          </div>
                          <div className="cart_content">
                            <div className="cart_text">Cart</div>
                            <div className="cart_price">${sumTotalPrice}</div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Navbar bg="dark" data-bs-theme="dark">
            <Container>
              <Nav className="mx-auto flex-wrap">
                <NavLink className="nav-link" to="/">
                  Home
                </NavLink>
                <NavLink className="nav-link" to="/store">
                  store
                </NavLink>
                <NavLink className="nav-link" to="/contact">
                  Contact
                </NavLink>
              </Nav>
            </Container>
          </Navbar>
        </header>
      </div>
    </>
  );
}

export default Header;
