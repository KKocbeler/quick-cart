import { IoMdClose } from 'react-icons/io';
import './FavoritePage.scss';
import { useEffect, useState } from 'react';
import { DataProps } from '../../proptypes/DataProps';
import data from '../../data/data.json';
import { Link } from 'react-router-dom';
import { FixLinkText } from '../../utility/FixLinkText';
import { GiBrokenHeartZone } from 'react-icons/gi';
import useStatus from '../../hooks/LoadingErrorContext';
import LoadingPage from '../Pieces/LoadingPage';

const FavoritePage = () => {
    const [favProducts, setFavProducts] = useState<DataProps[]>([]);
    const { loading, setLoading, error, setError} = useStatus();

    useEffect(() => {
        setLoading(true)

        setTimeout(() => {
            try {
                const favProductIDs = JSON.parse(localStorage.getItem("favoriteIDs") || "[]");
                setFavProducts(
                    data.filter(product => 
                        favProductIDs.includes(product.id)
                    )
                )
                setLoading(false)
            } catch (err) {
                setError(true)
            } finally {
                setLoading(false)
            }
        }, 1000)
    }, [])

    const removeFromFavs = (id: number) => {
        setFavProducts(prevFavs => prevFavs.filter(product => product.id !== id));

        const favProductIDs = JSON.parse(localStorage.getItem("favoriteIDs") || "[]");
        const updatedFavIDs = favProductIDs.filter((fav: number) => fav !== id)

        localStorage.setItem("favoriteIDs", JSON.stringify(updatedFavIDs))
    }

    console.log(favProducts)
    return (
        <div className='favorite-page'>
            {
                loading ? (<LoadingPage />) :
                favProducts.length > 0 ? (
                    <>
                        <div className='title'>My Favorites</div>
                        <div className="favorite-boxes">
                            {
                                favProducts.map(product => 
                                    <div className="favorite-box" key={product?.id}>
                                        <Link to={`/${FixLinkText(product?.category)}/${FixLinkText(product?.name)}`}>
                                            <img src={product?.image} alt={product?.name} loading='lazy' />
                                        </Link>
                                        <div className="fav-name">
                                            <Link to={`/${FixLinkText(product?.category)}/${FixLinkText(product?.name)}`}>
                                                {product?.name}
                                            </Link>
                                        </div>
                                        <div className="fav-price">${product?.price}</div>
                                        <IoMdClose onClick={() => removeFromFavs(product?.id)}/>
                                    </div>
                                )
                            }
                        </div>
                    </>
                ) : (
                    <div className='empty-fav'>
                        <GiBrokenHeartZone />
                        <p>Looks like you haven't added anything to your favorites yet!</p>
                    </div>
                )
            }

        </div>
    )
}

export default FavoritePage