import {Fragment} from "react";
import {Outlet} from "react-router-dom";
import '../../../styles/Layout.scss'

import NavBar from "./NavBar";
import LeftBar from "./LeftBar";
import RightBar from "./RightBar";

function Layout() {
    return (
        <Fragment>
            <NavBar />
            <div className='page'>
                <LeftBar />
                <div className='feed'>
                    <Outlet />
                </div>
                <RightBar/>
            </div>
        </Fragment>
    )
}

export default Layout;