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
function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [color, setcolor] = useState(null);
  const [QTY, setQTY] = useState(1);
  const [Added, setAdded] = useState(false);
  const { Sproduct, isLoading, RatingLoading } = useSelector(
    (state) => state.products
  );
  const { isLoadingCart, cart, user } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getSingleProduct(id));
    if (cart.some(item =>item.productId._id  == id )==true) {
      setAdded(true)
    }
  }, [id]);
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  const addToCart = async (id) => {
    if (user?.userInfo?.token) {
      if (color == null) {
        toast.warn("Please Choose Color");
        return false;
      } else {
        await dispatch(
          AddToCart({
            productId: id,
            color: color,
            price: Sproduct?._price,
            quantity: QTY,
          })
        );
        navigate("/cart");
      }
    } else {
      navigate("/login")
    }
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
                {!Added && (
                  <ul className="colors ps-0 mb-2">
                    {Sproduct.color
                      ? Sproduct.color.map((item, idx) => {
                        return (
                          <li
                            onClick={() => setcolor(item._id)}
                            className={color == item._id ? "active" : null}
                            role="button"
                            key={Math.random()}
                            style={{ backgroundColor: `${item.title}` }}
                          ></li>
                        );
                        })
                      : null}
                  </ul>
                )}
                <div className="d-flex">
                  {Added === false && (
                    <input
                      className="form-control text-center p-2 me-3"
                      id="inputQuantity"
                      type="number"
                      min={0}
                      value={QTY}
                      onChange={(e) => setQTY(e.target.value)}
                      style={{ maxWidth: "4rem" }}
                    />
                  )}

                  <button
                    className="btn btn-outline-dark flex-shrink-0"
                    type="button"
                    onClick={() => {
                      Added ? navigate("/cart") : addToCart(Sproduct?._id);
                    }}
                  >
                    {" "}
                    {isLoadingCart ? (
                      <SP animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </SP>
                    ) : (
                      <>
                        <FaCartPlus className="mx-2" />
                        {Added ? " Go to cart" : " Add to cart"}
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
