import './NavRight.scss';
import NavProfile from "./Nav-right-inner/NavProfile";
import NavCart from "./Nav-right-inner/NavCart";
import { CiHeart } from 'react-icons/ci';
const NavRight = () => {
  return (
    <ul className="nav-right">
        <li><NavProfile /></li>
        <li><CiHeart /></li>
        <li><NavCart /></li>
    </ul>
  )
}

export default NavRight