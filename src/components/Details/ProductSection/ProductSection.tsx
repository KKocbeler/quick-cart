import { useState } from 'react';
import { DataProps } from '../../../proptypes/DataProps';
import DetailCommentSection from './ProductSection_Pieces/DetailCommentSection';
import DetailsProductInfo from './ProductSection_Pieces/DetailsProductInfo';
import './ProductSection.scss';
import DetailQuestions from './ProductSection_Pieces/DetailQuestions';
import DetailShipping from './ProductSection_Pieces/DetailShipping';
import DetailReturn from './ProductSection_Pieces/DetailReturn';

interface PropsType {
    product: DataProps 
}

const ProductSection: React.FC<PropsType> = ({product}) => {
  const [showTab, setShowTab] = useState("Features");
  const tabs = ["Features", "Reviews", "Questions", "Shipping", "Return"]

  console.log(showTab)
  return (
    <div id="product-section">
        <div className="tabs">
          {
            tabs.map((tab, l) => (
                <button className={`tab-btn ${showTab === tab ? "active" : ""}`} key={l} onClick={() => setShowTab(tab)}>{tab}</button>
            ))
          }
        </div>
        <div className='body'>
            { showTab === "Features" && < DetailsProductInfo product={product} />}
            { showTab === "Reviews" && <DetailCommentSection name={product.name} image={product.image} brand={product.brand ?? "Unknown Brand"}/>}
            { showTab === "Questions" && <DetailQuestions />}
            { showTab === "Shipping" && <DetailShipping />}
            { showTab === "Return" && <DetailReturn />}
        </div>
    </div>
  )
}

export default ProductSection