import { Outlet } from "react-router-dom"

const MainLayout = () => {
    return (
        <>
            Navbar
            <div className="container">
                <Outlet />
            </div>
        </>
    )
}

export default MainLayout