import { Link } from 'react-router-dom';
import './NavLogo.scss';

const NavLogo = () => {
    return (
        <div className='nav-logo'>
            <Link to={'/'}>Veesa</Link> 
        </div>
    )
}

export default NavLogo