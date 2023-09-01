import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import ProductCard from "../components/productCard/ProductCard";
import Spinner from "../components/Spinner";
import WishlistHook from "../Hooks/WishlistHook";
import Lottie from "../components/Lottie";
import Meta from "../components/Meta";


function Wishlist() {
  const [favprod, WishlistState] =WishlistHook();
  useEffect(() => {
    window.scroll(0,0)
  }, [])
  
  return (
    <>
    <Meta title={"My Wishlist"}/>
    <section className="py-5 hero ">
      <Container>
        <Row>
          {WishlistState.length > 0 ? (
            WishlistState.map((item, idx) => {
              return (
                <Col lg="3" md="4" sm="6" key={idx}>
                  <ProductCard
                          id={item?._id}
                          data={item}
                          key={idx}
                          ke={item._id}
                          tag={item?.tags[0]}
                          wish={favprod.length > 0 ? favprod : []}
                        />
                </Col>
              );
            })
          ) : (
            <Lottie src={`https://lottie.host/67accbda-c574-4bc1-84dc-2232e7f5e469/IS9jdIYYqt.json`} title={"Wishlist Is Empty"}/>
          )}
        </Row>
      </Container>
    </section>
    </>
  );
}

export default Wishlist;
