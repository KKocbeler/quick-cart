import { CiSearch } from "react-icons/ci";
import './NavSearchbar.scss';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FixLinkText } from "../../utility/FixLinkText";

const NavSearchbar = () => {
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();
    const SearchedWord = (e: React.FormEvent) => {
        e.preventDefault();
        navigate(`/search/${FixLinkText(keyword)}`)
        setKeyword("");
    }

    return (
        <div className="nav-searchbar">
            <form onSubmit={(e) => SearchedWord(e)}>
                <input type="text" placeholder="Search..." value={keyword} onChange={(e) => setKeyword(e.target.value)}/>
                <button type="submit" aria-label="Search"> <CiSearch /> </button>
            </form>
        </div>
    )
}

export default NavSearchbar