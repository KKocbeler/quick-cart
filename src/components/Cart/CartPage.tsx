import { FaMinus, FaPlus, FaShoppingBag } from 'react-icons/fa';
import './CartPage.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { decreaseItem, increaseItem } from '../../store/cartSlice';
import { useState } from 'react';

const CartPage = () => {
    const cartList = useSelector((state: RootState) => state.cart.cartList);
    const dispatch = useDispatch();

    const [shippingPrice, setShippingPrice] = useState(0);
    const shipping = 19.99;
    const pickup = 0;

    const totalPrice = cartList.reduce((acc, product) => acc + product.price * product.quantity, 0);
    const grandPrice = shippingPrice + totalPrice;

    return (
        <div className={`cart-page ${cartList.length > 0 ? '' : 'empty'}`}>
            {cartList.length > 0 ? (
                <>
                    <div className="my-cart">
                        <div className='title'>Shopping Cart</div>
                        <div className="cart-products">
                            <div className="cart-header">
                                <div className='t-product'>Product</div>
                                <div className='t-color'>Color</div>
                                <div className='t-color'>Quantity</div>
                                <div className='t-price'>Price</div>
                            </div>
                            {cartList.map((item) => (
                                <div className='cart-product' key={item.id}>
                                    <div className="b-product">
                                        <div className="img">
                                            <img src={item.image} alt={item.name} loading='lazy'/>
                                        </div>
                                        <div className="info">{item.name}</div>
                                    </div>
                                    <div className="b-color">{item.selectedColor}</div>
                                    <div className="b-quantity">
                                        <div className="body">
                                            <span onClick={() => dispatch(decreaseItem({ id: item.id, selectedColor: item.selectedColor || "" }))}>
                                                <FaMinus />
                                            </span>
                                            {item.quantity}
                                            <span onClick={() => dispatch(increaseItem({ id: item.id, selectedColor: item.selectedColor || "" }))}>
                                                <FaPlus />
                                            </span>
                                        </div>
                                    </div>
                                    <div className="b-price">${(item.price * item.quantity).toFixed(2)}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className='bill'>
                        <div className="title">Cart Totals</div>
                        <div className="bill-prices">
                            <div className="subtotal">
                                <div className='section'>Subtotal</div>
                                <div className="subtotal-price">${totalPrice.toFixed(2)}</div>
                            </div>

                            <div className='shipping'>
                                <div className="section">Shipping</div>
                                <div className="prices">
                                    <div className="shipping-price">
                                        <label>
                                            <input
                                                type="radio"
                                                name="shipping"
                                                value={shipping}
                                                checked={shippingPrice === shipping}
                                                onChange={(e) => setShippingPrice(Number(e.target.value))}
                                            />
                                            Shipping: ${shipping}
                                        </label>
                                    </div>
                                    <div className="shipping-price">
                                        <label>
                                            <input
                                                type="radio"
                                                name="shipping"
                                                value={pickup}
                                                checked={shippingPrice === pickup}
                                                onChange={(e) => setShippingPrice(Number(e.target.value))}
                                            />
                                            Pickup: ${pickup}
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <div className="total">
                                <div className="section">Total</div>
                                <div className="total-price">${grandPrice.toFixed(2)}</div>
                            </div>

                            <button type='submit'>Proceed to checkout</button>
                        </div>
                    </div>
                </>
            ) : (
                <div className="empty-cart">
                    <FaShoppingBag size={50} />
                    <p>Your cart is currently empty.</p>
                </div>
            )}
        </div>
    );
};

export default CartPage;
