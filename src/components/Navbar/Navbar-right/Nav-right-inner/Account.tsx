import { CiGift, CiHeart, CiLogout, CiSettings, CiShoppingCart, CiUser } from 'react-icons/ci';
import './Account.scss';
import { useEffect, useRef, useState } from 'react';
import { PiAddressBookLight } from 'react-icons/pi';
import { Link } from 'react-router-dom';
import { FixLinkText } from '../../../../utility/FixLinkText';

const Account = () => {
    const [dropdown, setDropdown] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const accountList = [
        {
            icon: <PiAddressBookLight />,
            title: "My Addresses",
        },
        {
            icon: <CiShoppingCart />,
            title: "My Orders",
        },
        {
            icon: <CiHeart />,
            title: "My Favorites",
        },
        {
            icon: <CiSettings />,
            title: "Settings",
        },
        {
            icon: <CiGift />,
            title: "My Points",
        },
        {
            icon: <CiLogout />,
            title: "Logout",
        },
    ];
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if(dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdown(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [])
 
  return (
    <div className='account'>
        <div className="title" onClick={() => setDropdown(!dropdown)}> <CiUser /> Account </div>
        <div ref={dropdownRef} className={`account-dropdown ${dropdown ? "show" : ""}`}>
            <ul>
                {
                    accountList.map((item, index) => (
                        <li key={index} onClick={() => setDropdown(false)}>
                            <Link to={item.title === "Logout" ? "/" : `/my-account/${FixLinkText(item.title)}`} onMouseOver={() => index === 0 && setIsHovered(true)} onMouseLeave={() => index === 0 && setIsHovered(false)}>
                                {item.icon}
                                <span>{item.title}</span>
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </div>
        <div className={`direction-border ${dropdown ? "show" : ""} ${isHovered ? "hovered" : ""}`}></div>
    </div>
  )
}

export default Account