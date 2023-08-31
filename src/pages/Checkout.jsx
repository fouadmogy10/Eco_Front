import { Formik, useFormik } from "formik";
import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createOrder, emptyCart, getOrder, getcartItem } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import Meta from "../components/Meta";

let schema = Yup.object().shape({
  firstname: Yup.string().required("First Name is Required"),
  lastname: Yup.string().required("Last Name is Required"),
  state: Yup.string().required("State is Required"),
  address: Yup.string().required("address is Required"),
  city: Yup.string().required("City is Required"),
  country: Yup.string().required("Country is Required"),
  pincode: Yup.number().required("Pincode Required"),
  email: Yup.string().required("Email Required"),
});
const Checkout = () => {
  const navigate =useNavigate()
  const dispatch = useDispatch();
  const { cart, user, isLoading, isError } = useSelector((state) => state.auth);
  let cartState = cart ? cart : [];
  const [total, settotal] = useState(0);
  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < cart?.length; index++) {
      sum = sum + Number(cart[index].quantity) * cart[index].productId.price;
      settotal(sum);
    }
    if (cart.length == 0) {
      settotal(0);
    }
  }, [cart]);
  const formik = useFormik({
    initialValues: {
      firstname: user?.userInfo?.firstname,
      lastname: user?.userInfo?.lastname,
      email: user?.userInfo?.email,
      state: "",
      address: "",
      city: "",
      country: "",
      pincode: "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      await dispatch(
        createOrder({
          shippingInfo: values,
          cart: cart,
          totalPrice: total,
        })
      );
      formik.resetForm();
      dispatch(emptyCart());
      navigate("/")
    },

  });

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return (
    
    <>
    <Meta title={"Checkout"}/>
    <section className="py-5" style={{ background: "#f4f4f7" }}>
      <Container className="py-5">
        <Row>
          <Col md={4} className="order-md-2 mb-4">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-muted">Your cart</span>
              <span className="badge badge-secondary badge-pill text-dark">
                {cart.length}
              </span>
            </h4>
            <ul className="list-group mb-3">
              <li className="list-group-item d-flex justify-content-between lh-condensed">
                <div>
                  <h6 className="my-0">SubTotal</h6>
                </div>
                <span className="text-muted">${total}</span>
              </li>
              <li className="list-group-item d-flex justify-content-between lh-condensed">
                <div>
                  <h6 className="my-0">Shipping</h6>
                </div>
                <span className="text-muted">5</span>
              </li>

              <li className="list-group-item d-flex justify-content-between">
                <span>Total (USD)</span>
                <strong>${total + 5}</strong>
              </li>
            </ul>

            <form className="card p-2">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Promo code"
                />
                <div className="input-group-append">
                  <button type="submit" className="btn btn-warning text-white">
                    Redeem
                  </button>
                </div>
              </div>
            </form>
          </Col>
          <Col md={8} className="order-md-1 mb-4">
            <h4 className="mb-3">Billing address</h4>
            <form onSubmit={formik.handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="firstName">First name</label>
                  <input
                    name="firstname"
                    type="text"
                    className="form-control"
                    id="firstName"
                    onChange={formik.handleChange("firstname")}
                    onBlur={formik.handleBlur("firstname")}
                    value={formik.values.firstname}
                    disabled={true}
                  />
                  <div className="invalid-feedback d-block">
                    {formik.touched.firstname && formik.errors.firstname}
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="lastName">Last name</label>
                  <input
                    name="lastname"
                    type="text"
                    className="form-control"
                    id="lastName"
                    onChange={formik.handleChange("lastname")}
                    onBlur={formik.handleBlur("lastname")}
                    value={formik.values.lastname}
                    disabled={true}
                  />
                  <div className="invalid-feedback d-block">
                    {formik.touched.lastname && formik.errors.lastname}
                  </div>
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="email">Email</label>
                <input
                  name="eamil"
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="you@example.com"
                  onChange={formik.handleChange("email")}
                  onBlur={formik.handleBlur("email")}
                  value={formik.values.email}
                  disabled={true}
                />
                <div className="invalid-feedback d-block">
                  {formik.touched.email && formik.errors.email}
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="address">Address</label>
                <input
                  name="address"
                  type="text"
                  className="form-control"
                  id="address"
                  placeholder="1234 Main St"
                  onChange={formik.handleChange("address")}
                  onBlur={formik.handleBlur("address")}
                  value={formik.values.address}
                />
                <div className="invalid-feedback d-block">
                  {formik.touched.address && formik.errors.address}
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  className="form-control"
                  id="city"
                  name="city"
                  placeholder="Apartment or suite"
                  onChange={formik.handleChange("city")}
                  onBlur={formik.handleBlur("city")}
                  value={formik.values.city}
                />
                <div className="invalid-feedback d-block">
                  {formik.touched.city && formik.errors.city}
                </div>
              </div>

              <div className="row">
                <div className="col-md-5 mb-3">
                  <label htmlFor="country">Country</label>
                  <input
                    type="text"
                    className="form-control d-block w-100"
                    id="country"
                    name="country"
                    onChange={formik.handleChange("country")}
                    onBlur={formik.handleBlur("country")}
                    value={formik.values.country}
                  />

                  <div className="invalid-feedback d-block">
                    <div className="invalid-feedback d-block">
                      {formik.touched.country && formik.errors.country}
                    </div>
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <label htmlFor="state">State</label>
                  <input
                    type="text "
                    className="form-control"
                    name="state"
                    onChange={formik.handleChange("state")}
                    onBlur={formik.handleBlur("state")}
                    value={formik.values.state}
                  />
                  <div className="invalid-feedback d-block">
                    {formik.touched.state && formik.errors.state}
                  </div>
                </div>
                <div className="col-md-3 mb-3">
                  <label htmlFor="zip">Zip</label>
                  <input
                    type="number"
                    className="form-control"
                    id="zip"
                    name="pincode"
                    onChange={formik.handleChange("pincode")}
                    onBlur={formik.handleBlur("pincode")}
                    value={formik.values.pincode}
                  />
                  <div
                    className="invalid-feedback d-block"
                    style={{ fontSize: ".600rem" }}
                  >
                    {formik.touched.pincode && formik.errors.pincode}
                  </div>
                </div>
              </div>

              {isLoading ? (
                <Button type="button" variant="transparent" className="btn-def">
                  <Spinner animation="border" size="sm" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                </Button>
              ) : (
                <Button type="submit" variant="transparent" className="btn-def">
                  Continue to checkout
                </Button>
              )}
            </form>
          </Col>
        </Row>
      </Container>
    </section>
    </>
  );
};

export default Checkout;
