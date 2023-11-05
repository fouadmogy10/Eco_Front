import { FaCartPlus } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import Meta from "../components/Meta";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Spinner as SP } from "react-bootstrap";
import Review from "../components/Review";
import { useDispatch, useSelector } from "react-redux";
import { getSingleProduct } from "../features/product/productSlice";
import Spinner from "../components/Spinner";
import ProductSlider from "../components/ProductSlider";
import { toast } from "react-toastify";
import { AddToCart, getcartItem } from "../features/auth/authSlice";
import cartService from "../features/cart/cartService";
import Swal from "sweetalert2";
function ProductDetails() {
  //dispatch
  const dispatch = useDispatch();
  const [selectedColor, setSelectedColor] = useState("");
  const [QTY, setQTY] = useState(0);
  const [color, setcolor] = useState(null);

  //get id from params
  const { id } = useParams();
  const navigate = useNavigate();

  //get data from store
  const { Sproduct, isLoading, RatingLoading } = useSelector(
    (state) => state.products
  );
  const { isLoadingCart, cart, user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getSingleProduct(id));
    // if (cart.some((item) => item.productId._id == id) == true) {
    //   setAdded(true);
    // }
  }, [id]);
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  //Get cart items
  useEffect(() => {
    dispatch(cartService.getCartItemsFromLocalStorageAction());
  }, []);
  //get data from store
  const { cartItems, loading } = useSelector((state) => state?.carts);
  const productExists = cartItems?.find((item) => {
    return item?._id == Sproduct?._id  
  });


  //Add to cart handler
  //Add to cart handler
  const addToCartHandler = () => {
    //check if product is in cart
    // if (productExists) {
    //   return Swal.fire({
    //     icon: "error",
    //     title: "Oops...",
    //     text: "This product is already in cart",
    //   });
    // }
    //check if color/size selected
    if (selectedColor == "") {
      return toast.error("Please select product color")
    }

    const cartItem = {
      _id: Sproduct?._id,
      name: Sproduct?.title,
      qty: 1,
      price: Sproduct?.price,
      description: Sproduct?.description,
      color: selectedColor,
      image: Sproduct?.images[0].url,
      totalPrice: Sproduct?.price,
    };
    dispatch(cartService.addOrderToCartaction(cartItem));
   
    return dispatch(cartService.getCartItemsFromLocalStorageAction());
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Meta title={Sproduct?.title} />
      <section className="py-5" style={{ background: "#f8f9fa" }}>
        <Container>
          <div className=" px-4 px-lg-5 mt-5">
            <div className="row gx-4 gx-lg-5">
              <div className="col-md-4  ">
                <ProductSlider data={Sproduct?.images} />
              </div>
              <div className="col-md-8">
                <div>
                  <span className="mx-2 category">{Sproduct?.category}</span>
                  <span className="brand">{Sproduct?.brand}</span>
                </div>
                <h2 className=" fw-bolder mt-4">{Sproduct?.title}</h2>

                <div className="fs-5 mb-4">
                  Price :<span>${Sproduct?.price}</span>
                </div>

                <p
                  className="lead mb-0"
                  dangerouslySetInnerHTML={{ __html: Sproduct?.description }}
                ></p>
                <ul className="colors ps-0 mb-2">
                  {Sproduct.color
                    ? Sproduct.color.map((item, idx) => {
                        return (
                          <li
                            onClick={() => setSelectedColor(item?.title)}
                            className={
                              selectedColor == item?.title ? "active" : null
                            }
                            role="button"
                            key={Math.random()}
                            style={{ backgroundColor: `${item?.title}` }}
                          ></li>
                        );
                      })
                    : null}
                </ul>
                <div className="d-flex">
                  <button
                    className="btn btn-outline-dark flex-shrink-0"
                    type="button"
                    onClick={() => addToCartHandler()}
                    disabled={loading}
                  >
                    {" "}
                    {loading ? (
                      <SP animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </SP>
                    ) : (
                      <>
                        <FaCartPlus className="mx-2" />
                        {" Add to cart"}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <Review
            data={Sproduct.ratings ? Sproduct?.ratings : []}
            id={Sproduct._id}
            loading={RatingLoading}
          />
        </Container>
      </section>
    </>
  );
}

export default ProductDetails;
