import { Button, Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import CartItem from "../components/CartItem";
import Lottie from "../components/Lottie";
import Meta from "../components/Meta";
import cartService from "../features/cart/cartService";
function Cart() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(cartService.getCartItemsFromLocalStorageAction());
  }, [dispatch]);
  //get cart items from store
  const { cartItems } = useSelector((state) => state?.carts);
  //calculate total price
  let sumTotalPrice = 0;
  sumTotalPrice = cartItems?.reduce((acc, current) => {
    return acc + current?.totalPrice;
  }, 0);

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <>
      <Meta title={"My Cart"} />
      <section
        className="py-5 cart "
        style={{ backgroundColor: "#eee", minHeight: "80vh" }}
      >
        <Container>
          <section className="h-100">
            <div className=" h-100 py-5">
              <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-10">
                  <div className="d-flex justify-content-between align-items-center mb-4"></div>

                  {cartItems.length > 0 ? (
                    <>
                      <h3 className="fw-normal mb-0 text-black">
                        Shopping Cart
                      </h3>
                      {cartItems?.map((item) => {
                        return (
                          <CartItem
                            key={Math.random()}
                            data={item}
                            quantity={item.qty}
                            color={item.color}
                            id={item._id}
                            // removeFromcart={removeFromcart}
                          />
                        );
                      })}

                      <div
                        className="my-3 p-3"
                        style={{
                          maxWidth: "300px",
                          background: "rgb(119 119 119 / 14%)",
                          borderRadius: "10px",
                        }}
                      >
                        <h5>Total:{sumTotalPrice}$</h5>
                        <div className="checkout  d-flex justify-content-between align-items-center">
                          <p className="m-0">Payement when recieving</p>
                          <Form.Check type="radio" defaultChecked />
                        </div>
                        <div className="text-center d-flex justify-content-between">
                          <Link to={"/checkout"}>
                            <Button
                              variant="transparent mt-3"
                              className="btn-def"
                            >
                              Submit
                            </Button>
                          </Link>
                          <Link to={"/"}>
                            <div className="text-end">
                              <Button
                                variant="transparent mt-3"
                                className="btn-def"
                              >
                                Continue shopping
                              </Button>
                            </div>
                          </Link>
                        </div>
                      </div>
                    </>
                  ) : (
                    <Lottie
                      src={`https://lottie.host/b6eb34d6-98ee-436b-af1a-08b3fab1b795/RiGSbmCdsQ.json`}
                      title={"Shopping Cart Is Empty"}
                    />
                  )}
                </div>
              </div>
            </div>
          </section>
        </Container>
      </section>
    </>
  );
}

export default Cart;
