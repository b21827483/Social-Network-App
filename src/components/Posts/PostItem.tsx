import '../../../styles/PostItem.scss';
import pp from '../../assets/pp-not-found.png'

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

function PostItem({name, desc, img}) {

    return <div className='PostItem'>
        <div className='User'>
            <div className='UserInfo'>
                <img src={pp}/>
                <span className='user-name'>{name}</span>
                <span className='date'>1 hour ago</span>
            </div>
            <MoreHorizIcon className='PostOptions' />
        </div>
        <div className='Content'>
            <p>{desc}</p>
            <img src={img} />

        </div>
        <div className='Interactions'></div>
    </div>
}

export default PostItem