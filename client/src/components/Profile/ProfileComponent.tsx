import '../../../styles/Profile.scss';

import pp from '../../assets/pp-not-found.png';

import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

function ProfileComponent() {
    return (
        <div className='Profile'>
            <div className='Images'>
                <img className='background' src='https://media.istockphoto.com/id/656453072/photo/vintage-retro-grungy-background-design-and-pattern-texture.jpg?s=612x612&w=0&k=20&c=PiX0bt3N6Hqk7yO7g52FWCunpjqm_9LhjRA2gkbl5z8='/>
                <img className='pp' src={pp}/>
            </div>
            <div className='ProfileContainer'>
                <div className='UserInfo'>
                    <div className='OtherSocialMedias'>
                        <a>
                            <FacebookIcon />
                        </a>
                        <a>
                            <XIcon />
                        </a>
                        <a>
                            <InstagramIcon />
                        </a>
                    </div>
                    <div className='About'>
                        <h2 className='Name'>Saul Goodman</h2>
                        <button className='FollowButton'>Follow</button>
                    </div>
                    <div className='Actions'>
                        <MailOutlineIcon />
                        <MoreHorizIcon />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileComponent