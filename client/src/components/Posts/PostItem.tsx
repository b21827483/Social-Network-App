import {useState} from "react";

import axios from "axios";
import moment from 'moment';

import '../../../styles/PostItem.scss';
import pp from '../../assets/pp-not-found.png'
import Comments from "./Comments";

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';

function PostItem({postId, name, desc, postImg, createdAt}) {

    const [commentToggle, setCommentToggle] = useState<String>('slide-in');
    const [commentActive, setCommentActive] = useState<boolean>(false);
    const [comment, setComment] = useState<String>();
    const [err, setErr] = useState(null);

    function openComments() {
        setCommentActive(prevState => (!prevState));
        setCommentToggle(prevState => (prevState === 'slide-out' ? 'slide-in' : 'slide-out'));
    }

    async function addComment() {
        console.log("get")
        await axios.post('http://localhost:8800/api/comments', {comment, postId}, {
            withCredentials: true,
        }).then(function (response) {
            setComment("");
            setErr(null)
        }).catch(function (e) {
            setErr(e);
        })
        console.log("post")
    }

    return <div className='PostItem'>
        <div className='User'>
            <div className='UserInfo'>
                <img src={pp}/>
                <span className='user-name'>{name}</span>
                <span className='date'>{moment(createdAt, "MMMM Do YYYY, hh:mm:ss").fromNow()}</span>
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
                    <textarea className='comment-area' placeholder='Write a comment' rows={2}
                              value={comment} onChange={(e) => {setComment(e.target.value)}} required={true}/>
                    <SendOutlinedIcon className='send-comment-icon' onClick={addComment}/>
                </div>
                {err && err}
                <Comments postId={postId} />
            </div>}
    </div>
}

export default PostItem