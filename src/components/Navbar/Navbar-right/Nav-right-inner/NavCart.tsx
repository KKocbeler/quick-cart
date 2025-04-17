import { CiShoppingCart } from 'react-icons/ci';
import './NavCart.scss';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { deleteItemCart } from '../../../../store/cartSlice';
import { Link } from 'react-router-dom';
import { IoIosCart, IoMdClose } from 'react-icons/io';
import { FixLinkText } from '../../../../utility/FixLinkText';

const NavCart = () => {
    const [showMiniCart, setShowMiniCart] = useState(false);
    const cartList = useSelector((state: RootState) => state.cart.cartList);
    const dispatch = useDispatch();

    const { totalPrice, totalQuantity } = cartList.reduce(
        (acc, product) => {
            acc.totalPrice += product.quantity * product.price;
            acc.totalQuantity += product.quantity;
            return acc;
        },
        { totalPrice: 0, totalQuantity: 0 }
    );

    const miniCartToggle = () => {
        setShowMiniCart(!showMiniCart);
    };

    return (
        <div className='nav-cart'>
            <div className="my-cart" onClick={miniCartToggle} >
                <CiShoppingCart />
                <span>My Cart</span>
            </div>
            

            <div className={`mini-cart ${showMiniCart ? 'show' : ''}`} >
                {cartList.length > 0 ? (
                    <>
                        <div className="added-products">
                            {cartList.map((product, index) => (
                                <div className="product" key={index}>
                                    <div className="product-name">
                                        <Link to={`${FixLinkText(product.category)}/${FixLinkText(product.name)}`} onClick={miniCartToggle}>
                                        {product.name}
                                        </Link>
                                    </div>
                                    <div className="product-features">
                                        <div className="product-img">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                loading="lazy"
                                            />
                                        </div>
                                        <div className="product-info">
                                            <div className="color">Color: {product.selectedColor}</div>
                                            <div className="quantity">Quantity: {product.quantity}</div>
                                            <div className="price">${product.price}</div>
                                        </div>
                                    </div>
                                    <div
                                        className="delete-product"
                                        onClick={() => dispatch(deleteItemCart(product))}
                                    >
                                        <IoMdClose />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="proceed-to-bag">
                            <div className="total">
                                <div>Subtotal ({totalQuantity} Product{totalQuantity > 1 ? 's' : ''})</div>
                                <div>${totalPrice.toFixed(2)}</div>
                            </div>
                            <div className="to-bag">
                                <Link to="/cart" onClick={miniCartToggle}>
                                    PROCEED TO BAG
                                </Link>
                            </div>
                            <div className="continue-shop" onClick={miniCartToggle}>
                                Continue Shopping
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="empty-cart">
                        <IoIosCart />
                        Your cart is currently empty.
                        <div className="continue-shop" onClick={miniCartToggle}>Continue Shopping</div>
                    </div>
                )}
            </div>

            <div className={`direction-border ${showMiniCart ? 'show' : ''}`}></div>
        </div>
    );
};

export default NavCart;
