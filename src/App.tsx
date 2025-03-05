import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.scss'
import Home from './page/Home'
import MainLayout from './layouts/MainLayout'

function App() {

    return (
        <Router>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path='/' element={<Home />} />
                </Route>
            </Routes>
        </Router>
    )
}

export default App
