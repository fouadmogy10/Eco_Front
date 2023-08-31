import { BsFillTrashFill } from "react-icons/bs";
import { Button, Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getcartItem, removeFromCart } from "../features/auth/authSlice";
import { useEffect, useState } from "react";
import CartItem from "../components/CartItem";
import Lottie from "../components/Lottie";
import  cartLottie from "../assets/lottieJson/cart.json"
import Meta from "../components/Meta";
function Cart() {
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.auth);
  const [total, settotal] = useState(0);
  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < cart?.length; index++) {
      sum = sum + Number(cart[index].quantity) * cart[index].productId.price;
      settotal(sum);
    }
  }, [cart, dispatch]);
  const removeFromcart = async (id) => {
    await dispatch(removeFromCart(id));
  };
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    <>
    <Meta title={"My Cart"}/>
    <section
      className="py-5 cart "
      style={{ backgroundColor: "#eee", minHeight: "80vh" }}
    >
      <Container>
        <section className="h-100">
          <div className=" h-100 py-5">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-10">
                <div className="d-flex justify-content-between align-items-center mb-4">
                </div>

                {cart.length > 0 ? (
                  <>
                  <h3 className="fw-normal mb-0 text-black">Shopping Cart</h3>
                    {cart.map((item, idx) => {
                      return (
                        <CartItem
                          key={item._id}
                          data={item.productId}
                          quantity={item.quantity}
                          color={item.color[0].title}
                          id={item._id}
                          removeFromcart={removeFromcart}
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
                      <h5>Total:{total}$</h5>
                      <div className="checkout  d-flex justify-content-between align-items-center">
                        <p className="m-0">Paiement when recieving</p>
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
                  <Lottie src={`https://lottie.host/b6eb34d6-98ee-436b-af1a-08b3fab1b795/RiGSbmCdsQ.json`} title={"Shopping Cart Is Empty"}/>
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
