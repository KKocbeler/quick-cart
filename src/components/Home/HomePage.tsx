import CampaignSection from './CampaignSection'
import FashionDeals from './FashionDeals'
import HomeAdds from './HomeAdds'
import HomeSwiper from './HomeSwiper'
import TrustBadges from './TrustBadges'

const HomePage = () => {
  return (
    <div>
        <HomeAdds />
        <HomeSwiper />
        <FashionDeals category={'Electronics'}/>
        <FashionDeals category={'Home & Living'}/>
        <CampaignSection />
        <FashionDeals category={'Sports & Outdoor'}/>
        <FashionDeals category={'Books & Stationery'}/>
        <TrustBadges />
    </div>
  )
}

export default HomePage