import {useContext} from "react";
import {useNavigate} from "react-router-dom";

import '../../../../styles/NavBar.scss'
import {ThemeContext} from "../../../context/ThemeContext";
import {AuthContext} from "../../../context/AuthContext";

import HomeIcon from '@mui/icons-material/Home';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import SearchIcon from '@mui/icons-material/Search';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';

function NavBar() {

    const {currentUser} = useContext(AuthContext);
    const themeContext = useContext(ThemeContext);

    const navigate = useNavigate();

    return (
        <div className='navbar-root'>
            <div className='left-navbar'>
                <div className='home'>
                    <HomeIcon onClick={() => {navigate("/")}}/>
                    <span>ZULA</span>
                </div>
                {themeContext.theme === 'light' ? <DarkModeIcon onClick={themeContext.toggleTheme} /> :
                    <WbSunnyIcon onClick={themeContext.toggleTheme}/>}
            </div>
            <div className='searchbar'>
                <SearchIcon />
                <input/>
            </div>
            <div className='right-navbar'>
                <MessageOutlinedIcon />
                <div className='user'>
                    <span>{currentUser.username}</span>
                    <img src={`http://localhost:8800/images/${currentUser.pPicture}`} onClick={() => {navigate(`/profile/${currentUser.id}`)}}/>
                </div>
            </div>
        </div>
    )
}

export default NavBar