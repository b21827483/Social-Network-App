import '../../../../styles/LeftBar.scss'

import PeopleIcon from '@mui/icons-material/People';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import MmsIcon from '@mui/icons-material/Mms';
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';

function LeftBar() {
    return (
        <div className='leftbar'>
            <div className='container'>
                <div className='social'>
                    <h1>Social</h1>
                    <div className='friends'>
                        <PeopleIcon />
                        <span>Friends</span>
                    </div>
                    <div className='groups'>
                        <Diversity1Icon />
                        <span>Groups</span>
                    </div>
                </div>
                <div className='your-posts'>
                    <h1>Your Posts</h1>
                    <div className='images'>
                        <MmsIcon />
                        <span>Images</span>
                    </div>
                    <div className='videos'>
                        <VideoCameraBackIcon />
                        <span>Videos</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LeftBar