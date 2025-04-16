import { DataProps } from '../../proptypes/DataProps';
import './DetailsProductInfo.scss';

interface PropsType {
    product: DataProps; 
}

const DetailsProductInfo: React.FC<PropsType> = ({product}) => {
    
    const info: string[] = [
        "Made from 100% Organic Cotton for a Soft and Comfortable Feel",
        "Breathable, Lightweight Fabric Ideal for Summer Days",
        "Perfectly Tailored to Fit Your Body Shape with a Flattering Silhouette",
        "Available in a Variety of Sizes to Suit Different Body Types",
        "Designed with a Classic A-line Cut for a Timeless Look",
        "Subtle Yet Elegant Embroidery on the Collar for a Touch of Sophistication",
        "Machine Washable for Easy Maintenance and Long-lasting Durability",
        "Available in a Range of Trendy Colors and Patterns to Suit Every Taste",
        "Ideal for Both Casual and Semi-Formal Occasions – Versatile Wardrobe Staple",
        "Non-See-Through Material for Added Comfort and Confidence",
    ];

    const features = {
        "Fit": "Regular",
        "Neck Type": "Crew Neck",
        "Material": "Cotton",
        "Package Content": "Single",
        "Collection": "Basic",
        "Pattern": "Plain",
        "Fabric Type": "Woven",
        "Sleeve Type": "Short Sleeve",
        "Color": "Blue",
        "Pocket": "No Pocket",
        "Sleeve Length": "Short",
        "Length": "Standard",
        "Environment": "Casual/Daily",
        "Additional Feature": "Washed",
        "Print/Embroidery Technique": "Plain",
        "Sustainability Detail": "No",
        "Weave Type": "Tulle",
        "Silhouette": "Straight",
        "Season": "Summer",
        "Origin": "BD"
    };

    const formattedInfo = info.map((info => 
        info.charAt(0) + info.slice(1).toLocaleLowerCase()
    ));

    return (
        <div className='detail-product-info'>
            <div className="info">
                <div className="product-img">
                    <img src={product.image} alt={product.name} />
                </div>
                <div className="info-section">
                    <div className="title">{product.name}</div>
                    <ul className="info-list">
                        {
                            formattedInfo.map((item, i) => (
                                <li key={i}>{item}</li>
                            ))
                        }
                    </ul>
                </div>
            </div>
            <div className="feature">
                <ul>
                    {Object.entries(features).map(([key, value], index) => (
                        <li key={index}>
                        <div className="question">{key}</div>
                        <div className="answer">{value}</div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
  )
}

export default DetailsProductInfo