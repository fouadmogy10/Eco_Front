import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import Lottie from "../components/Lottie";
import Meta from "../components/Meta";
import { useEffect } from "react";
const MyOredrs = () => {
  const { myOrder } = useSelector((state) => state.auth);
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  return (
    <section className="orders py-5 hero">
      <Meta title={"My Order"} />
      <Container>
        <Row>
          {myOrder?.length > 0 ? (
            myOrder?.map((order, idx) => (
              <Col sm={12} key={order?._id}>
                <div className="Order-wrapper shadow-sm p-4 mb-5 bg-white rounded">
                  <div className="title mb-2 py-2">
                    <h6>
                      {" "}
                      #Order No :{" "}
                      <span className="ms-2 bg-secondary rounded-2 p-2 text-white">
                        {order?._id}
                      </span>
                    </h6>
                  </div>
                  <Row
                    style={{
                      maxHeight: "207px",
                      overflowY: "scroll",
                    }}
                  >
                    {order?.cart.length > 0
                      ? order?.cart.map((product, ind) => (
                          <Col className="col-12 col-lg-6 p-1" key={ind}>
                            <div className="products  d-flex flex-wrap bg-white order-shadow p-3 rounded-3 gap-1 gap-sm-2">
                              <div className="w-fit-content d-flex p-2 p-md-3 bg-secondary rounded-3">
                                <img
                                  src={product?.image}
                                  alt=""
                                  style={{
                                    maxWidth: "80px",
                                    objectFit: "contain",
                                  }}
                                  className="w-100 h-100 object-cover"
                                />
                              </div>
                              <div className="col-6 col-md-5 d-flex flex-column gap-2 py-2 ">
                                <span className="prod-title card-title card-item-title">
                                  {" "}
                                  {product?.name}
                                </span>
                                <p
                                  className="prod-description card-text fs-7 m-0 card-item-title"
                                  style={{
                                    fontSize: "15px",
                                  }}
                                  dangerouslySetInnerHTML={{
                                    __html: product.productId?.description,
                                  }}
                                ></p>
                                <div className="d-flex align-items-center gap-3">
                                  <div className="d-flex">
                                    Color :
                                    <span
                                      className="colors p-3 ms-2 rounded-circle shadow-sm border border-1"
                                      style={{
                                        background: `${product.color}`,
                                      }}
                                    ></span>
                                  </div>
                                </div>
                              </div>
                              <div className="w-fit-content d-flex flex-column gap-2 py-2 px-md-3  ">
                                <span
                                  className="prod-price px-3 py-2  text-white rounded-3"
                                  style={{ background: "#e74821ff" }}
                                >
                                  <span className="">
                                    {product?.price}
                                  </span>{" "}
                                  $
                                </span>
                                <span className="prod-quantity">
                                  Qty :{" "}
                                  <span className="text-muted ms-1 fs-7">
                                    {product.qty}
                                  </span>
                                </span>
                              </div>
                            </div>
                          </Col>
                        ))
                      : null}
                  </Row>

                  <div className="order-info p-3 mt-3 d-flex flex-wrap justify-content-between gap-3 gap-sm-3 border-top border-2">
                    <div className=" d-flex flex-column gap-2">
                      <div className="d-flex align-items-center fw-bold">
                        Status :{" "}
                        <span className="ms-2 d-inline-block rounded-pill px-2 py-1 text-white bg-dark">
                          {order?.orderStatus}
                        </span>{" "}
                      </div>
                      <div className="d-flex fw-bold text-nowrap">
                        Address :
                        <div className="d-flex flex-column ms-2 text-muted">
                          <span>
                            {" "}
                            {order?.shippingInfo?.country},
                            {order?.shippingInfo.city} ,
                            {order?.shippingInfo.address}{" "}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className=" d-flex flex-wrap flex-column gap-2">
                      <div className="d-flex fw-bold text-nowrap">
                        Created At :
                        <span className="ms-2 text-muted">
                          {new Date(order?.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="d-flex flex-column justify-content-end justify-content-md-start gap-2">
                      <span
                        className=" px-2 px-sm-3 py-2 rounded-pill fs-7 fs-bold text-white text-nowrap"
                        style={{ background: "#e74821ff" }}
                      >
                        {order?.totalPrice} $
                      </span>
                    </div>
                  </div>
                </div>
              </Col>
            ))
          ) : (
            <Lottie
              src={`https://lottie.host/649bc8b7-cdc5-4f0c-9dc6-cf70a5c1eeed/IxHKTGKpbV.json`}
              title={"No Order"}
            />
          )}
        </Row>
      </Container>
    </section>
  );
};

export default MyOredrs;
