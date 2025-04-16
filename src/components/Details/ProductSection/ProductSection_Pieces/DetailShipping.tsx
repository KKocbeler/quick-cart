import './DetailShipping.scss';

const DetailShipping = () => {
    const shippingInfo = [
        {
          title: "Fast Shipping",
          description: "We understand the importance of time, which is why we offer express delivery services to get your order to you as quickly as possible. With our priority shipping options, you can receive your package within 24-48 hours, depending on your location. We partner with top-tier logistics companies to ensure a smooth and efficient delivery process, so you never have to wait too long for your order.",
          image: "/img/detail-images/shipping-icons/fast-shipping.png"
        },
        {
          title: "Secure Shipping",
          description: "Your safety and the security of your order are our top priorities. We take extra precautions to ensure that your package is carefully packed and handled with care throughout the shipping process. All shipments include tracking numbers, insurance, and optional signature confirmation to provide you with peace of mind. Whether it’s a valuable item or a delicate product, we make sure it reaches you in perfect condition.",
          image: "/img/detail-images/shipping-icons/safe-shipping.png"
        },
        {
          title: "Affordable & Free Shipping",
          description: "We believe that shipping costs shouldn’t be a burden for our customers. That’s why we offer budget-friendly shipping options, including discounted rates for bulk orders. Additionally, we provide free shipping on selected items and during special promotions. Our goal is to ensure that you get the best value for your money without compromising on the quality of our delivery services.",
          image: "/img/detail-images/shipping-icons/price-shipping.png"
        },
        {
          title: "Global Shipping",
          description: "No matter where you are in the world, we make sure your order reaches you. We have partnered with reliable international couriers to provide efficient and cost-effective global shipping solutions. Whether you’re ordering from North America, Europe, Asia, or any other region, we ensure smooth customs processing and timely deliveries. Shop with confidence, knowing that we can bring your favorite products to your doorstep, wherever you may be.",
          image: "/img/detail-images/shipping-icons/global-shipping.png"
        }
    ];
  return (
    <div className='detail-shipping'>
        {
            shippingInfo.map((item, i) => (
                <div className="shipping_info_box" key={i}>
                    <div className="info_box__image">
                        <img src={item.image} alt={item.title} loading='lazy'/>
                    </div>
                    <div className="info_box__body">
                        <div className="title">{item.title}</div>
                        <p>{item.description}</p>
                        </div>
                </div>
            ))
        }
    </div>
  )
}

export default DetailShipping