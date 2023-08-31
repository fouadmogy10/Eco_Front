import React from "react";
import {
  FaArrowRight,
  FaGift,
  FaHeadphones,
  FaPaypal,
  FaServer,
  FaTruck,
} from "react-icons/fa6";
import shop1 from "../assets/images/shop01.webp";
import shop2 from "../assets/images/shop02.webp";
import shop3 from "../assets/images/shop03.webp";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import Bcard from "../components/BlogCard/Bcard";
import Title from "../components/Title";
import ProductCard from "../components/productCard/ProductCard";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import HotDeal from "../components/hotDeal/HotDeal";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Skeleton from "../components/Skeleton";
import WishlistHook from "../Hooks/WishlistHook";
import Meta from "../components/Meta";
import Spinner from "../components/Spinner";
import { getProducts } from "../features/product/productSlice";

function Home() {
  const dispatch =useDispatch()
  const [favprod, WishlistState] = WishlistHook();
  const { products, isLoading: PLoading } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(getProducts())
  
  }, [])
  if (PLoading) {
    return <Spinner />;
  }
  
  return (
    <>
      <Meta title={"Home Page"} />
      <div className="section py-5">
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-md-4  col-sm-6 col-xs-12">
              <div className="shop">
                <div className="shop-img">
                  <img loading="lazy" alt=" img" src={shop1} />
                </div>
                <div className="shop-body">
                  <h3>
                    Laptop
                    <br />
                    Collection
                  </h3>
                  <Link to="/" className="cta-btn">
                    Shop now
                    <FaArrowRight />
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-md-4 col-sm-6 col-xs-12">
              <div className="shop">
                <div className="shop-img">
                  <img loading="lazy" alt=" img" src={shop2} />
                </div>
                <div className="shop-body">
                  <h3>
                    Accessories
                    <br />
                    Collection
                  </h3>
                  <Link to="/" className="cta-btn">
                    Shop now <FaArrowRight />
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-md-4 col-sm-6 col-xs-12">
              <div className="shop">
                <div className="shop-img">
                  <img loading="lazy" alt=" img" src={shop3} />
                </div>
                <div className="shop-body">
                  <h3>
                    Cameras
                    <br />
                    Collection
                  </h3>
                  <Link to="/" className="cta-btn">
                    Shop now <FaArrowRight />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Container fluid className="hero">
        {/* services section */}
        <section className="py-5">
          <Container>
            <Row className="align-items-center justify-content-center">
              <Col
                md={4}
                lg={3}
                sm="6"
                xs={12}
                className="d-flex mb-3 align-items-center services justify-content-center"
              >
                <div className="ico px-3">
                  <FaTruck size={35} />
                </div>
                <div className="text">
                  <h4>Free Shipping</h4>
                  <span>from all orders over $100</span>
                </div>
              </Col>
              <Col
                md={4}
                lg={3}
                sm="6"
                xs={12}
                className="d-flex mb-3 align-items-center services justify-content-center"
              >
                <div className="ico px-3">
                  <FaGift size={35} />
                </div>
                <div className="text">
                  <h4>Daily Surprises Offers</h4>
                  <span>save up to 25% off</span>
                </div>
              </Col>
              <Col
                md={4}
                lg={3}
                sm="6"
                xs={12}
                className="d-flex mb-3 align-items-center services justify-content-center"
              >
                <div className="ico px-3">
                  <FaHeadphones size={35} />
                </div>
                <div className="text">
                  <h4>Support 24/7</h4>
                  <span>shop with an export</span>
                </div>
              </Col>
              <Col
                md={4}
                lg={3}
                sm="6"
                xs={12}
                className="d-flex mb-3 align-items-center services justify-content-center"
              >
                <div className="ico px-3">
                  <FaServer size={35} />
                </div>
                <div className="text">
                  <h4>Affordable Prices</h4>
                  <span>get factory direct price</span>
                </div>
              </Col>
              <Col
                md={4}
                lg={3}
                sm="6"
                xs={12}
                className="d-flex mb-3 align-items-center services justify-content-center"
              >
                <div className="ico px-3">
                  <FaPaypal size={35} />
                </div>
                <div className="text">
                  <h4>Secure Payment</h4>
                  <span>100% protected payments</span>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        {/* product section */}
        <section className="products py-5">
          <Container>
            <Title title="most popular" />

            {/* <Swiper
              key={"a1"}
              slidesPerView={1}
              spaceBetween={10}
              loop={true}
              autoplay={{
                delay: 1500,
                disableOnInteraction: true,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 40,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 50,
                },
              }}
              modules={[Autoplay]}
              className="mySwiper"
            >
              {PLoading ? (
                <Skeleton />
              ) : products.length > 0 ? (
                products.map((item, idx) => {
                  if (item.tags[0] == "popular") {
                    return (
                      <SwiperSlide key={idx}>
                        <ProductCard
                          id={item?._id}
                          data={item}
                          key={idx}
                          ke={item._id}
                          tag={item?.tags[0]}
                          wish={favprod.length > 0 ? favprod : []}
                        />
                      </SwiperSlide>
                    );
                  }
                })
              ) : null}
            </Swiper> */}
             {/* <Swiper
        slidesPerView={1}
        spaceBetween={10}
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        loop={true}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 50,
          },
        }}
        modules={[Pagination,Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide className="p-5">Slide 1</SwiperSlide>
        <SwiperSlide className="p-5">Slide 2</SwiperSlide>
        <SwiperSlide className="p-5">Slide 3</SwiperSlide>
        <SwiperSlide className="p-5">Slide 4</SwiperSlide>
        <SwiperSlide className="p-5">Slide 5</SwiperSlide>
        <SwiperSlide className="p-5">Slide 6</SwiperSlide>
        <SwiperSlide className="p-5">Slide 7</SwiperSlide>
        <SwiperSlide className="p-5">Slide 8</SwiperSlide>
        <SwiperSlide className="p-5">Slide 9</SwiperSlide>
      </Swiper> */}
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        loop={true}
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        // navigation={true}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 50,
          },
        }}
        modules={[ Navigation,Autoplay]}
        className="mySwiper"
      >
        
        {PLoading ? (
                <Skeleton />
              ) : products.length > 0 ? (
                products.map((item, idx) => {
                  if (item.tags[0] == "popular") {
                    return (
                      <SwiperSlide key={idx}>
                        <ProductCard
                          id={item?._id}
                          data={item}
                          key={idx}
                          ke={item._id}
                          tag={item?.tags[0]}
                          wish={favprod.length > 0 ? favprod : []}
                        />
                      </SwiperSlide>
                    );
                  }
                })
              ) : null}
      </Swiper>
          </Container>
        </section>
        {/* hot deal */}
        <HotDeal />
        {/* product section */}
        <section className="products py-5">
          <Container>
            <Title title="most popular" />

            <Swiper
              key={"a1"}
              slidesPerView={1}
              spaceBetween={10}
              loop={true}
              autoplay={{
                delay: 1500,
                disableOnInteraction: true,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 3,
                  spaceBetween: 40,
                },
                1024: {
                  slidesPerView: 4,
                  spaceBetween: 50,
                },
              }}
              modules={[Autoplay]}
              className="mySwiper"
            >
              {PLoading ? (
                <Skeleton />
              ) : products.length > 0 ? (
                products.map((item, idx) => {
                  if (item.tags[0] == "featured" || item.tags[0] == "special") {
                    return (
                      <SwiperSlide key={idx}>
                        <ProductCard
                          id={item?._id}
                          data={item}
                          key={idx}
                          ke={item._id}
                          tag={item?.tags[0]}
                          wish={favprod.length > 0 ? favprod : []}
                        />
                      </SwiperSlide>
                    );
                  }
                })
              ) : null}
            </Swiper>
          </Container>
        </section>
      </Container>
    </>
  );
}

export default Home;
