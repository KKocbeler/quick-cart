import { CiUser } from "react-icons/ci";
import './NavProfile.scss'

const NavProfile = () => {
    return (
        <div className="nav-profile">
            <div className="user">
                Login <CiUser />
            </div>
        </div>
    )
}

export default NavProfile