import './CampaignSection.scss';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Navigation, Scrollbar } from 'swiper/modules';
import { Link } from 'react-router-dom';

const CampaignSection = () => {

    const campaignData = [
        {
          src: "beauty.jpeg",
          title: "Beauty & Care",
          link: "/search/?category=Beauty+%26+Personal+Care"
        },
        {
          src: "home.jpg",
          title: "Home Essentials",
          link: "/search/?category=Home+%26+Living"
        },
        {
          src: "books.webp",
          title: "Books & Novels",
          link: "/search/?category=Books+%26+Stationery"
        },
        {
          src: "console.webp",
          title: "Gaming Gear",
          link: "/search/gaming"
        },
        {
          src: "electronics.jpg",
          title: "Electronics",
          link: "/search/?category=Electronics"
        },
        {
          src: "sports.avif",
          title: "Sports & Outdoors",
          link: "/search/sports"
        }
    ];

  return (
    <div className='campaign-section'>
        <div className="campaign-text">
            <h3> Spring Sale </h3>
        </div>
        <div className="campaign-list">
            <Swiper
            modules={[Navigation, Scrollbar, FreeMode]}
            initialSlide={1}
            spaceBetween={10}
            slidesPerView={4}
            slidesPerGroup={4}
            speed={750}
            navigation
            scrollbar={{ draggable: true}}
            freeMode
            >
                {
                    campaignData.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div className="campaign-list-item">
                                <Link to={item.link}>
                                    <div className="campaign-item">
                                        <div className="campaign-item__img">
                                            <img src={`/img/campaign-img/${item.src}`} alt="" />
                                        </div>
                                        <div className="campaign-item__button">
                                            {item.title}
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </SwiperSlide>
                    ))
                }

            </Swiper>
        </div>
    </div>
  )
}

export default CampaignSection