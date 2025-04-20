import { Link, useParams } from "react-router-dom";
import data from "../../data/data.json";
import { useEffect, useState } from "react";
import { DataProps } from "../../proptypes/DataProps";
import './DetailsPage.scss';
import { SlArrowRight } from "react-icons/sl";
import { FixLinkText } from "../../utility/FixLinkText";
import Star from "../Pieces/Star";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import FashionDeals from "../Home/FashionDeals";
import { Swiper, SwiperClass } from 'swiper/react';
import { Navigation, Thumbs } from "swiper/modules";
import { SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ProductSection from "./ProductSection/ProductSection";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../store/cartSlice";
import { FaCheck } from "react-icons/fa6";

const DetailPage = () => {
    const [selectedProduct, setSelectedProduct] = useState<DataProps | null>(null);
    const { name } = useParams();
    const [selectedColor, setSelectedColor] = useState('');
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
    const [showAddedBar, setShowAddedBar] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        const foundProduct = data.find(product =>
            FixLinkText(product?.name) === name
        );

        if(foundProduct) {
            setSelectedProduct(foundProduct);
            setSelectedColor(foundProduct.color[0] || "");

            const currentFavs = JSON.parse(localStorage.getItem("favoriteIDs") || "[]");
            if(currentFavs.includes(foundProduct?.id)) {
                setSelectedProduct(prevProduct => 
                    prevProduct ? { ...prevProduct, isProductAddFav: true} : prevProduct
                )
            }
        } else {
            setSelectedProduct(null)
        }
    }, [data, name])

    const handleAddToCart = () => {
        setShowAddedBar(true);
        if(!selectedProduct) return ;

        dispatch(addItemToCart({
            ...selectedProduct,
            selectedColor: selectedColor || selectedProduct.color[0],
            quantity: 1
        }));

        setTimeout(() => {
            setShowAddedBar(false);
        }, 1000);
    }

    const detailsImage: string[] = [
        `${selectedProduct?.image}`,
        "/img/detail-images/detail-1.webp",
        "/img/detail-images/detail-2.webp",
        "/img/detail-images/detail-3.webp",
        "/img/detail-images/detail-4.webp",
        "/img/detail-images/detail-5.webp",
    ]

    const handleToggleFavorite = () => {
        const newFavStatus = !selectedProduct?.isProductAddFav
        setSelectedProduct(prevProduct =>
            prevProduct ? {...prevProduct, isProductAddFav: newFavStatus} : null
        );

        const favList = JSON.parse(localStorage.getItem("favoriteIDs") || "[]")
        const updatedFavList = newFavStatus
            ? [...favList, selectedProduct?.id]
            : favList.filter((id: number) => id !== selectedProduct.id)
        
        localStorage.setItem("favoriteIDs", JSON.stringify(updatedFavList));

    };

    const freeShipping = () => {
        alert('FREEEEEEEEEEEEEE')
    }

  return (
    <div className="detail-page">
        <div className="orientation-arrows">
            <Link to={"/"}>Home</Link>
            <SlArrowRight />
            <Link to={`/search/?category=${selectedProduct?.category.replaceAll(" ","+").replaceAll("&","%26")}`}>{selectedProduct?.category}</Link>
            <SlArrowRight />
            <div>{selectedProduct?.name}</div>
        </div>
        <div className="detail-body">
            <div className="body-left">
                <div className="main-image">
                    <Swiper
                    modules={[Navigation, Thumbs]}
                    thumbs={{ swiper: thumbsSwiper }}
                    initialSlide={0}
                    spaceBetween={0}
                    slidesPerView={1}
                    speed={750}
                    navigation
                    loop
                    >
                        {
                            detailsImage.map((image, j) => (
                                <SwiperSlide key={j}>
                                    <img src={image} alt="swiper-image" loading="lazy"/>
                                </SwiperSlide>
                            ))
                        }

                    </Swiper>
                </div>
                <div className="other-images">
                    <Swiper
                        modules={[Navigation, Thumbs]}
                        onSwiper={setThumbsSwiper}
                        initialSlide={1}
                        spaceBetween={2}
                        slidesPerView={6}
                        speed={750}
                        grabCursor={true}
                        className="thumbs-swiper"
                        >
                            {
                                detailsImage.map((image, k) => (
                                    <SwiperSlide key={k}>
                                        <img src={image} alt="swiper-image" loading="lazy"/>
                                    </SwiperSlide>
                                ))
                            }

                        </Swiper>
                </div>
            </div>
            <div className="body-right">
                <div className="product-header">
                    <div className="title"> <span>{selectedProduct?.brand}</span> {selectedProduct?.name} </div>
                    <Star size={'large'} count={4} commentCount={selectedProduct?.commentCount || 2}/>
                </div>
                <div className="product-body">
                    <div className="price">${selectedProduct?.price}</div>
                    <div className="color-section">
                        <div className="title"> <span>Color:</span> {selectedColor}</div>
                        <form>
                            {
                                selectedProduct?.color?.map((item, i) => (
                                    <label key={i}>
                                        <input type="radio" name="size" value={item} checked={selectedColor === item} onChange={(e) => setSelectedColor(e.target.value)}/>
                                        {item}
                                    </label>
                                ))
                            }
                        </form>
                    </div>
                </div>
                <div className="product-bottom">
                    <button className="addcart-button" onClick={handleAddToCart}>
                        Add to Cart
                    </button>
                    <div className="shipping-info">
                        <div className="title">Shipping Information</div>
                        <div className="info">
                            <div><span className="cargo-company">Veesa Cargo - </span><span className="cargo-type" onClick={freeShipping}>Free Shipping</span></div>
                            <p>It will be shipped on Monday, March 24th at the latest.</p>
                        </div>

                    </div>
                </div>
                <div className={`add-fav-button ${selectedProduct?.isProductAddFav ? "full" : ""}`} onClick={handleToggleFavorite}>
                    {
                        selectedProduct?.isProductAddFav ? <IoMdHeart /> : <IoMdHeartEmpty /> 
                    }
                </div>
            </div>
            {showAddedBar && (
            <div className="added-bar">
                <FaCheck /> 1 Product added to cart
            </div>
            )}
        </div>
        {selectedProduct && <ProductSection product={selectedProduct}/>}
        <div className="more-like-this">
            <div>More Like This</div>
            <FashionDeals category={selectedProduct?.category}/>
        </div>
    </div>
  )
}

export default DetailPage