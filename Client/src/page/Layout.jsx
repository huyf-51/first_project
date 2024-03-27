import { Outlet } from "react-router-dom"
import Header from "../components/Header"

function Layout() {
    console.log('layout render');
    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}

export default Layout