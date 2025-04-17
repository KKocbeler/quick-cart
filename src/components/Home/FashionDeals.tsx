import './FashionDeals.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import data from '../../data/data.json'
import { DataProps } from '../../proptypes/DataProps';
import Star from '../Pieces/Star';
import { IoMdHeart, IoMdHeartEmpty } from 'react-icons/io';
import { FixLinkText } from '../../utility/FixLinkText';

interface FashionDealsProps{
    category?: string;
    data?: DataProps[];
}

const FashionDeals: React.FC<FashionDealsProps> = ({category}) => {
    const [newData, setNewData] = useState<DataProps[]>([]);

    useEffect(() => {
        const favIDs = JSON.parse(localStorage.getItem("favoriteIDs") || "[]")

        const filtered = data
            .filter(product => product.category === category)
            .map(product => ({
                ...product,
                isProductAddFav: favIDs.includes(product.id)
        }));

        setNewData(filtered)

    }, [category])

    const handleToggleFavorite = (id: number) => {
        setNewData(newData.map(dt => dt.id === id
            ? {...dt, isProductAddFav: !dt.isProductAddFav}
            : dt
        ))

        const currentFavs = JSON.parse(localStorage.getItem("favoriteIDs") || "[]");
        let updatedFavs;

        if(currentFavs.includes(id)) {
            updatedFavs = currentFavs.filter((favId: number) => favId !== id)
        } else {
            updatedFavs = [...currentFavs, id]
        }
        
        localStorage.setItem("favoriteIDs", JSON.stringify(updatedFavs));
    };

  return (
    <div className='fashion-deals'>
        <div className='fashion-deals__title'>{category}</div>
        <div className='deal-list'>
            <Swiper
            modules={[Navigation]}
            initialSlide={1}
            spaceBetween={0}
            slidesPerView={5}
            slidesPerGroup={2}
            speed={750}
            navigation
            scrollbar={{ draggable: true }}
            >
                    {
                        newData?.map((product) => (
                            <SwiperSlide key={product?.id}>
                                <div className='deal-item'>
                                    <Link to={
                                           `/${FixLinkText(product?.category)}/${FixLinkText(product?.name)}`
                                        }>
                                        <div className="deal-img">
                                            <img src={product.image} alt={product?.name} />
                                        </div>
                                        <div className='deal-info'>
                                            <div className='stars'> <Star count={product?.star} commentCount={product?.commentCount}/> </div>
                                            <div className='name'> <span className='brand'>{product?.brand}</span> {product?.name}</div>
                                            <div className="price">${product?.price}</div>
                                        </div>
                                    </Link>
                                    <div className={`add-fav-button ${product?.isProductAddFav ? 'fill' : ''}`} onClick={() => handleToggleFavorite(product?.id)}>
                                        {
                                            product?.isProductAddFav ? <IoMdHeart /> : <IoMdHeartEmpty /> 
                                        }
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))
                    }
            </Swiper>
        </div>
    </div>
  )
}

export default FashionDeals