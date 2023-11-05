import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import ProductCard from "../../productCard/ProductCard";
import WishlistHook from "../../../Hooks/WishlistHook";
import Skeleton from "../../../components/Skeleton";
const PopularSwiper = ({products,PLoading}) => {
    const [favprod, WishlistState] = WishlistHook();
  return (
    <Swiper
    slidesPerView={1}
    spaceBetween={30}
    loop={true}
    autoplay={{
      delay: 1500,
      disableOnInteraction: true,
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
    modules={[Navigation, Autoplay]}
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
  )
}

export default PopularSwiper