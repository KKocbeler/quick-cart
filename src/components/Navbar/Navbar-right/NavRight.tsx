import './NavRight.scss';
import NavCart from "./Nav-right-inner/NavCart";
import { CiHeart, CiUser } from 'react-icons/ci';
import { Link } from 'react-router-dom';
const NavRight = () => {
  return (
    <ul className="nav-right">
        <li><Link to={"my-account"}><CiUser /> <span>My Account</span></Link></li>
        <li><Link to={"/my-favorite"}> <CiHeart /> <span>My Favorite</span> </Link> </li>
        <li><NavCart /></li>
    </ul>
  )
}

export default NavRight