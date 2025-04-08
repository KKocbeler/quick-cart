import './NavSection.scss';
import { Link } from 'react-router-dom';
import { FixLinkText } from '../../utility/FixLinkText';

const NavSection = () => {
    const mostSearched = ["Mouse","Smart Watch", "Smart TV", "Latop", "Sunglasses", "Sneakers", "Table", "Lamp", "Shoes", "Shampoo", "Headphone"]
  return (
    <div className='nav-section'>
        <div className="categories">
            {
                mostSearched.map((item, i) => (
                    <div className="category" key={i}>
                        <Link to={`/search/${FixLinkText(item)}`}>{item}</Link>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default NavSection