import NavLogo from "./NavLogo"
import NavSearchbar from "./NavSearchbar"
import './Navbar.scss';
import NavRight from "./Navbar-right/NavRight";
import NavSection from "./NavSection";

const Navbar = () => {
  return (
    <>
    <div className="navbar">
        <div className="container">
            <NavLogo />
            <NavSearchbar />
            <NavRight />
        </div>
    </div>
    <NavSection />
    </>
  )
}

export default Navbar