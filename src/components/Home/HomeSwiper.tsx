import './HomeSwiper.scss';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import { Link } from 'react-router-dom';

const HomeSwiper = () => {

  const swiperData = [
    {
      id: 1,
      title: "Kitchen Deals",
      img: "/img/home-swiper/kitchen.jpg",
      search: "kitchen"
    },
    {
      id: 2,
      title: "Gaming Essentials",
      img: "/img/home-swiper/swiper-gaming.jpg",
      search:"gaming"
    },
    {
      id: 3,
      title: "Towel Collections",
      img: "/img/home-swiper/towel.webp",
      search:"towel"
    },
    {
      id: 4,
      title: "Shoe Offers",
      img: "/img/home-swiper/sneakers.webp",
      search: "sneakers"
    }
  ];

  return (
    <div className='home-swiper'>
        <Swiper
        modules={[Pagination, Navigation, Autoplay]}
        grabCursor
        initialSlide={0}
        centeredSlides
        slidesPerView={1}
        speed={800}
        slideToClickedSlide
        navigation
        loop
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true}}
        scrollbar={{ draggable: true }}
        >
          {
            swiperData.map((item, index) => (
                <SwiperSlide key={index}>
                    <Link to={`/search/${item.search}`}>
                        <img src={item.img} alt={item.title} />
                        <div>
                          <div className="title">{item.title}...</div>
                          <div className='btn-swiper'>Shop Now</div>
                        </div>
                    </Link>
                </SwiperSlide>
            ))
          }

        </Swiper>
    </div>
  )
}

export default HomeSwiper