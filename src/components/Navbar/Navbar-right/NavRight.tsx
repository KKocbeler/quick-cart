import './NavRight.scss';
import NavCart from "./Nav-right-inner/NavCart";
import { CiHeart } from 'react-icons/ci';
import { Link } from 'react-router-dom';
import Account from './Nav-right-inner/Account';
const NavRight = () => {
  return (
    <ul className="nav-right">
        <li> <Account /> </li>
        <li><Link to={"/my-favorite"}> <CiHeart /> <span>My Favorite</span> </Link> </li>
        <li><NavCart /></li>
    </ul>
  )
}

export default NavRight