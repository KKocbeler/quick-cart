import './Footer.scss';
import data from '../../data/data.json'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaApple, FaGooglePlay, FaInstagram, FaLinkedin, FaTwitter, FaWhatsapp, FaYoutube } from 'react-icons/fa';
import { SiAppgallery } from 'react-icons/si';
import { FaX } from 'react-icons/fa6';

const Footer = () => {
    const [getCategory, setGetCategory] = useState<string[]>([]);
    const popularPages = [
        { path: '/', label: 'Bluetooth Headphone' },
        { path: '/', label: 'Robot Vacuum Cleaner' },
        { path: '/', label: 'Mobile Phone' },
        { path: '/', label: 'AirPods Earphones' },
        { path: '/', label: 'Gold' },
        { path: '/', label: 'Hair Dryer' },
        { path: '/', label: 'Apple Watch' },
        { path: '/', label: 'Airfryer/Fryer' },
        { path: '/', label: 'Smartwatch' },
        { path: '/', label: 'PlayStation 5' },
        { path: '/', label: 'iPhone 14' }
    ]
    const paymentMethods = [
        {path: '/', label:'Credit Card'},
        {path: '/', label:'Installment Payment'}
    ]
    const aboutUs = [
        {path: '/', label: 'Career'},
        {path: '/', label: 'Sustainability'},
        {path: '/', label: 'Contact'},
    ]

    useEffect(() => {
        setGetCategory([...new Set(data?.map((item) => item.category))])
    }, [])

  return (
    <div className="footer">
        <div className="container">
            <div className="ft-menu">
                <ul className="ft-list">
                    <li>
                        <div className="ft-list-item">
                            <h4>Categories</h4>
                            <ul>
                                {
                                    getCategory.map((item, i) => (
                                        <li key={i}>
                                            <Link to={'/'}>{item}</Link>
                                        </li>
                                    ))
                                }
                                
                            </ul>
                        </div>
                    </li>
                    <li>
                        <div className='ft-list-item'>
                            <h4>Popular Pages</h4>
                            <ul>
                                {
                                    popularPages.map((item, j) => (
                                        <li key={j}>
                                            <Link to={item.path}>{item.label}</Link>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>        
                    </li>
                    <li>
                        <div className="ft-list-item">
                            <h4>Payment Methods</h4>
                            <ul>
                                {
                                    paymentMethods.map((item, k) => (
                                        <li key={k}>
                                            <Link to={item.path}>{item.label}</Link>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </li>
                    <li>
                        <div className="ft-list-item">
                            <h4>About Us</h4>
                            <ul>
                                {
                                    aboutUs.map((item, l) => (
                                        <li key={l}>
                                        <Link to={item.path}>{item.label}</Link>
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </li>
                </ul>
                <div className="links">
                    <div className='social-links'>
                        <Link to={'/'}> <FaTwitter />  </Link>
                        <Link to={'/'}> <FaInstagram />  </Link>
                        <Link to={'/'}> <FaYoutube />  </Link>
                        <Link to={'/'}> <FaX />  </Link>
                        <Link to={'/'}> <FaLinkedin />  </Link>
                        <Link to={'/'}> <FaWhatsapp />  </Link>
                    </div>
                    <div className="app-links">
                        <Link to={'/'}><FaApple /> App Store</Link>
                        <Link to={'/'}><FaGooglePlay /> Google Play</Link>
                        <Link to={'/'}><SiAppgallery /> AppGallery</Link>
                    </div>
                </div>

            </div>
        </div>
        <div className="terms">
            <div className='container'>
                <div className="all-rights">
                    @2025 KKocbeler. All Rights Reserved.
                </div>
                <ul>
                    <li>
                        <Link to={'/'}>Cookie Preferences</Link>
                    </li>
                    <li>
                        <Link to={'/'}>Terms of Use</Link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Footer