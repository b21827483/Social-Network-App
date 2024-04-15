import {Outlet} from "react-router-dom";
import '../../../../styles/Layout.scss'

import NavBar from "./NavBar";
import LeftBar from "./LeftBar";
import RightBar from "./RightBar";
import {useContext, useState} from "react";
import {ThemeContext} from "../../../context/ThemeContext";


function Layout() {
    const themeContext = useContext(ThemeContext);

    return (
        <div className={`theme-${themeContext.theme}`} style={{height: '100%', width:'100%'}}>
            <NavBar />
            <div className='page'>
                <div className='LEFTBAR'>
                    <LeftBar />
                </div>
                <div className='HOME'>
                    <Outlet />
                </div>
                <div className='RIGHTBAR'>
                    <RightBar/>
                </div>
            </div>
        </div>
    )
}

export default Layout;