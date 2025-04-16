import { Link } from 'react-router-dom';
import './NotFoundPage.scss';

const NotFoundPage = () => {
  return (
    <div className='not-found-page'>
        <div className="page-body">
            <div>404</div>
            <p>The page you are looking for was not found.</p>
            <Link to={'/'}>Back to Home</Link>
        </div>
    </div>
  )
}

export default NotFoundPage