import '../../../styles/NavBar.scss'
import image from '../../assets/pp-not-found.png';

import HomeIcon from '@mui/icons-material/Home';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import SearchIcon from '@mui/icons-material/Search';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

function NavBar() {
    return (
        <div className='navbar-root'>
            <div className='left-navbar'>
                <div className='home'>
                    <HomeIcon />
                    <span>ZULA</span>
                </div>
                <DarkModeIcon />
            </div>
            <div className='searchbar'>
                <SearchIcon />
                <input/>
            </div>
            <div className='right-navbar'>
                <MessageOutlinedIcon />
                <div className='user'>
                    <span>Username</span>
                    <img src={image} />
                </div>
            </div>
        </div>
    )
}

export default NavBar