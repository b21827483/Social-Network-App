import {Outlet} from "react-router-dom";
import '../../../styles/Layout.scss'

import NavBar from "./NavBar";
import LeftBar from "./LeftBar";
import RightBar from "./RightBar";
import {useContext} from "react";
import {ThemeContext} from "../../context/ThemeContext";


function Layout() {

    const themeContext = useContext(ThemeContext);

    return (
        <div className={`theme-${themeContext.theme}`}>
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