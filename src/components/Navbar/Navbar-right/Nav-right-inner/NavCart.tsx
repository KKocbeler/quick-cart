import { CiShoppingCart } from 'react-icons/ci';
import './NavCart.scss';
import { useState } from 'react';

const NavCart = () => {
    const [showMiniCart, setShowMiniCart] = useState<boolean>(false);

    const MiniCartToggle = () => {
        setShowMiniCart(!showMiniCart)
    }

    console.log('minicart', showMiniCart)
    return (
        <div className='nav-cart'>
            <CiShoppingCart onClick={MiniCartToggle}/>
            <div className={`mini-cart ${showMiniCart ? 'show' : ''}`}>
                <div className="product">
                    <div className="product-name">Blue T-shirt</div>
                    <div className="product-features">
                        <div className="product-img">
                            <img src="s" alt="" loading='lazy'/>
                        </div>
                        <div className="product-info">
                            <div className="color">Color: Brown</div>
                            <div className="size">Size: S</div>
                            <div className="quantity">Quantity: 1</div>
                            <div className="price">$29.99</div>
                        </div>
                    </div>
                </div>
                <div className="proceed-to-bag">
                    <div className="total">
                        <div>Subtotal (1 item)</div>
                        <div>$29.99</div>
                    </div>
                    <div className="to-bag">
                        PROCEED TO BAG
                    </div>
                    <div className='continue-shop' onClick={MiniCartToggle}>
                        Continue Shopping
                    </div>
                </div>
            </div>
            <div className={`direction-border ${showMiniCart ? 'show' : ''}`}></div>
        </div>
    )
}

export default NavCart