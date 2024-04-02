import {Outlet} from "react-router-dom";
import '../../../styles/Layout.scss'

import NavBar from "./NavBar";
import LeftBar from "./LeftBar";
import RightBar from "./RightBar";

function Layout() {
    return (
        <div className='theme-dark'>
            <NavBar />
            <div className='page'>
                <LeftBar />
                <div className='feed'>
                    <Outlet />
                </div>
                <RightBar/>
            </div>
        </div>
    )
}

export default Layout;