import React from "react";
import Meta from "../components/Meta";
import { Col, Container, Row } from "react-bootstrap";
import ProductCard from "../components/productCard/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import WishlistHook from "../Hooks/WishlistHook";
import Filter from "../components/Offcanvas";
import StoreSkelton from "../components/StoreSkelton";
function Store() {
  const dispatch = useDispatch();
  const [favprod, WishlistState] = WishlistHook();
  const { products ,isLoading} = useSelector((state) => state.products);
  const { brands } = useSelector((state) => state.brand);
  const { pCategories } = useSelector((state) => state.category);
  return (
    <>
      <Meta title={"our store"} />
      <div className="store-wrapper py-5">
        <Container>
          <Row>
            {/* <Col lg="3" md="3" className="main-filter">
              
            </Col> */}
            <Col lg="12" md="12" sm="12">
              <div className="row align-items-center justify-content-center">
                
                  <Filter  data={
                    {brands:brands.length>0 ?brands :[] ,
                      pCategories:pCategories.length>0 ?pCategories :[]
                    }
                  }/>
                
              </div>
              <Row className="py-3 align-items-center justify-content-center">
                {isLoading ? (
                  <>
                    <StoreSkelton/>
                  </>
                ) : products.length > 0 ? (
                  products.map((item, idx) => {
                    return (
                      <Col lg="3" md="4" sm="6" key={item._id}>
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
                ) : (<h2>No Data</h2>)}
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Store;
