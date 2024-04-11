import {useState} from "react";

import '../../../styles/PostItem.scss';
import pp from '../../assets/pp-not-found.png'

import Comments from "./Comments";

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import axios from "axios";

function PostItem({name, desc, postImg}) {

    const [commentToggle, setCommentToggle] = useState<String>('slide-in');
    const [commentActive, setCommentActive] = useState<boolean>(false);

    function openComments() {
        setCommentActive(prevState => (!prevState));
        setCommentToggle(prevState => (prevState === 'slide-out' ? 'slide-in' : 'slide-out'));
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
            <img src={"http://localhost:8800/images/" + postImg} alt='img'/>
        </div>
        <div className='Interactions'>
            <div className='icons'>
                <div className='like-icon'>
                    <FavoriteBorderIcon />
                    <span>Like</span>
                </div>
                <div className='comment-icon'>
                    <MessageOutlinedIcon onClick={openComments}/>
                    <span>Comments</span>
                </div>
            </div>
        </div>
        {commentActive &&
            <div id='Comments' className={commentToggle}>
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