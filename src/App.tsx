import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.scss'
import Home from './page/Home'
import MainLayout from './layouts/MainLayout'
import ProductDetails from './page/ProductDetails'
import { ScrollToTop } from './utility/ScrollToTop'
import SearchPage from './components/Search/SearchPage'
import Cart from './page/Cart'
import Favorite from './page/Favorite'
import NotFoundPage from './components/Pieces/NotFoundPage'
import MyAccount from './page/MyAccount'

function App() {

    return (
        <Router>
            <ScrollToTop />
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path='/' element={<Home />} />
                    <Route path=':category/:name' element={<ProductDetails />} />
                    <Route path='/search' element={<SearchPage /> } />
                    <Route path='/search/:name' element={<SearchPage />} />
                    <Route path='/cart' element={<Cart /> } />
                    <Route path='/my-account' element={<MyAccount />} />
                    <Route path='/my-favorite' element={<Favorite /> } />
                    <Route path='*' element={<NotFoundPage />} />
                </Route>
            </Routes>
        </Router>
    )
}

export default App
