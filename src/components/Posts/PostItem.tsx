import {useState} from "react";

import '../../../styles/PostItem.scss';
import pp from '../../assets/pp-not-found.png'

import Comments from "./Comments";

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';

function PostItem({name, desc, img}) {

    const [commentToggle, setCommentToggle] = useState<Boolean>(false);

    function openComments() {
        setCommentToggle(prevState => (!prevState))
    }

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
        <div className='Interactions'>
            <div className='icons'>
                <div className='like-icon'>
                    <FavoriteBorderIcon ></FavoriteBorderIcon>
                    <span>Like</span>
                </div>
                <div className='comment-icon'>
                    <MessageOutlinedIcon onClick={openComments}/>
                    <span>Comments</span>
                </div>
            </div>
        </div>
        {commentToggle &&
            <div>
                <div className='MakeComment'>
                    <img src={pp}/>
                    <textarea className='comment-area' placeholder='Write a comment' rows={2}/>
                    <SendOutlinedIcon className='send-comment-icon'/>
                </div>
                <Comments />
            </div>}
    </div>
}

export default PostItem