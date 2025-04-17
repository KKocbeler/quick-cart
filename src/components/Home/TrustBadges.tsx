import './TrustBadges.scss';
import { FaShippingFast, FaTag } from "react-icons/fa";
import { GiReturnArrow } from "react-icons/gi";
import { SiAdguard } from "react-icons/si";

interface BagesProps {
    id: number;
    name: string;
    icon: React.ElementType;
}

const TrustBadges  = () => {
    const badges:BagesProps[] = [
        { id: 1, name: "Affordable Prices", icon: FaTag },
        { id: 2, name: "Secure Shopping", icon: SiAdguard},
        { id: 3, name: "Fast Shipping", icon: FaShippingFast},
        { id: 4, name: "Easy Returns", icon: GiReturnArrow }
    ];
  return (
    <div className='trust-bages'>
        <ul className='bage-list'>
            {
                badges.map((item, i) => (
                    <li className="bage-item" key={i}>
                        <item.icon />
                        <span>{item.name}</span>
                    </li>
                ))
            }
        </ul>
    </div>
  )
}

export default TrustBadges 