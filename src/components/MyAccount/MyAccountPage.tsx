import { FaUser } from 'react-icons/fa';
import './MyAcccontPage.scss';
import { CiGift, CiHeart, CiLogout, CiSettings, CiShoppingCart } from 'react-icons/ci';
import { PiAddressBookLight } from 'react-icons/pi';
import { GoChevronRight } from 'react-icons/go';
import { useEffect, useState } from 'react';
import FavoritePage from '../Favorite/FavoritePage';

const MyAccountPage = () => {
    const [showTab, setShowTab] = useState("My Addresses");
    const accountList = [
        {
          icon: <PiAddressBookLight />,
          title: "My Addresses",
          path: "/account/addresses",
        },
        {
          icon: <CiShoppingCart />,
          title: "My Orders",
          path: "/account/orders",
        },
        {
          icon: <CiHeart />,
          title: "My Favorites",
          path: "/account/favorites",
        },
        {
          icon: <CiSettings />,
          title: "Account Settings",
          path: "/account/settings",
        },
        {
          icon: <CiGift />,
          title: "My Points & Vouchers",
          path: "/account/vouchers",
        },
        {
          icon: <CiLogout />,
          title: "Logout",
          path: "/logout",
        },
    ];

    const handleTab = (title: string) => {
        setShowTab(title)
    };

  return (
    <div className='my-account'>
        <aside>
            <header className='user-info'>
                <div className="user-avatar"><FaUser /></div>
                <div className="username">Kemal Koçbeler</div>
                <div className='user-email'>kkocbeler@gmail.com</div>
            </header>
            <ul className='account-list'>
                {
                    accountList.map((item, index) => (
                        <li key={index} onClick={() => handleTab(item.title)}>
                            <div>
                                {item.icon} <span>{item.title}</span>
                            </div>
                            <GoChevronRight />
                        </li>
                    ))
                }
            </ul>
        </aside>
        <section>
            {showTab === "My Favorites" && <FavoritePage />}
        </section>
    </div>
  )
}

export default MyAccountPage