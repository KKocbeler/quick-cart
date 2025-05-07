import { FaUser } from 'react-icons/fa';
import './MyAcccontPage.scss';
import { CiGift, CiHeart, CiLogout, CiSettings, CiShoppingCart } from 'react-icons/ci';
import { PiAddressBookLight } from 'react-icons/pi';
import { GoChevronRight } from 'react-icons/go';
import { useEffect, useState } from 'react';
import FavoritePage from '../Favorite/FavoritePage';
import MyAddresses from './MyAccountPage/MyAddresses';
import { useNavigate, useParams } from 'react-router-dom';
import { FixLinkText } from '../../utility/FixLinkText';


const MyAccountPage = () => {
    const [showTab, setShowTab] = useState("My Addresses");
    const navigate = useNavigate();
    const { tab } = useParams();

    useEffect(() => {
      if (tab) {
        const found = accountList.find(item => FixLinkText(item.title) === tab)
        if (found) {
          setShowTab(found.title)
        }
      }
    }, [tab])

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

    const handleTab = (title: string, tab: string) => {
        setShowTab(title)
        if(tab !== "Logout") {
          navigate(`/my-account/${FixLinkText(tab)}`)
        } else {
          navigate("/")
        }
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
                        <li key={index} onClick={() => handleTab(item.title, item.title)}>
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
            {showTab === "My Addresses" && <MyAddresses />}
            {showTab === "My Orders" && <p>I haven't created this page yet.</p>}
        </section>
    </div>
  )
}

export default MyAccountPage