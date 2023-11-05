import { Container } from "react-bootstrap";
import Title from "../components/Title";
import HotDeal from "../components/hotDeal/HotDeal";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Meta from "../components/Meta";
import Spinner from "../components/Spinner";
import { getProducts } from "../features/product/productSlice";
import PopularSwiper from "../components/Home/Swiper/PopularSwiper";
import FeaturedSwiper from "../components/Home/Swiper/FeaturedSwiper";
import Top from "../components/Home/Top";
import Services from "../components/Home/Services";

function Home() {
  const dispatch = useDispatch();
  const { products, isLoading: PLoading } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(getProducts());
  }, []);
  if (PLoading) {
    return <Spinner />;
  }

  return (
    <>
      <Meta title={"Home Page"} />
      <Top />
      <Container fluid className="hero">
        {/* services section */}
        <Services />
        {/* product section */}
        <section className="products py-5">
          <Container>
            <Title title="most popular" />
            <PopularSwiper
              products={products.length > 0 ? products : []}
              PLoading={PLoading}
            />
          </Container>
        </section>
        {/* hot deal */}
        <HotDeal />
        {/* product section */}
        <section className="products py-5">
          <Container>
            <Title title="Spacial & Featued" />

            <FeaturedSwiper
              products={products.length > 0 ? products : []}
              PLoading={PLoading}
            />
          </Container>
        </section>
      </Container>
    </>
  );
}

export default Home;
