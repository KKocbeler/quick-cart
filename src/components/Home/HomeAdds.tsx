import { Link } from 'react-router-dom';
import './HomeAdds.scss';

const HomeAdds = () => {
  return (
    <div className='home-adds'>
        <div className="left-side">
          <div className="left-section">Get physically fit</div>
          <div className="left-section">Find balance in your work life</div>
          <div className="left-section">Take care of your mental well-being</div>
          <div className="left-section"><img src="/img/adds-section.png" alt="add" /></div>
        </div>
        <div className="right-side">
          <Link to={"/search/sport"}>See More</Link>
        </div>
    </div>
  )
}

export default HomeAdds