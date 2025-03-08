import { CiSearch } from "react-icons/ci";
import './NavSearchbar.scss';

const NavSearchbar = () => {
    return (
        <div className="nav-searchbar">
            <form>
                <input type="text" placeholder="Search..." />
                <span> <CiSearch /> </span>
            </form>
        </div>
    )
}

export default NavSearchbar