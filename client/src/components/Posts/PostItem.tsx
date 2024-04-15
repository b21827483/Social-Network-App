import {useContext, useEffect, useState} from "react";

import axios from "axios";
import moment from 'moment';

import '../../../styles/PostItem.scss';
import Comments from "./Comments";
import {AuthContext} from "../../context/AuthContext";

import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';

type postErrors = {
    postError: string | null,
    likeError: string | null,
}

type Like = {
    liked: boolean,
    count: number,
}

function PostItem({postId, name, desc, postImg, pPicture, createdAt}) {

    const {currentUser} = useContext(AuthContext);

    const [commentToggle, setCommentToggle] = useState<String>('slide-in');
    const [commentActive, setCommentActive] = useState<boolean>(false);
    const [like, setLike] = useState<Like>({
        liked: false,
        count: 0,
    });
    const [comment, setComment] = useState<String>();
    const [err, setErr] = useState<postErrors>({
        postError: null,
        likeError: null
    });

    useEffect(() => {
        async function getLikeCount() {
            await axios.get(`http://localhost:8800/api/likes?postId=${postId}`, {
                withCredentials: true,
            }).then(function (response) {
                setLike({liked: response.data.liked, count: response.data.count});
                setErr(prevState => ({...prevState, likeError: null}));
            }).catch(function (e) {
                setErr(prevState => ({...prevState, likeError: e.message}));
            })
        }
        getLikeCount();
    }, [])

    function openComments() {
        setCommentActive(prevState => (!prevState));
        setCommentToggle(prevState => (prevState === 'slide-out' ? 'slide-in' : 'slide-out'));
    }

    async function addComment() {
        await axios.post('http://localhost:8800/api/comments', {comment, postId}, {
            withCredentials: true,
        }).then(function (response) {
            setComment("");
            setErr(prevState => ({...prevState, postError: null}))
        }).catch(function (e) {
            setErr(prevState => ({...prevState, postError: e.message}));
        })
    }

    async function addLikeHandler() {
        await axios.post("http://localhost:8800/api/likes", {postId}, {
            withCredentials: true,
        }).then(function (response) {
            setLike(prevState => ({liked: true, count: prevState.count + 1}))
        })
    }

    async function removeLikeHandler() {
        await axios.post("http://localhost:8800/api/likes/deleteLike", {postId}, {
            withCredentials: true,
        }).then(function (response) {
            setLike(prevState => ({liked: false, count: prevState.count - 1}))
        })
    }

    return <div className='PostItem'>
        <div className='User'>
            <div className='UserInfo'>
                <img src={`http://localhost:8800/images/${pPicture}`}/>
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
                    {like.liked ? <FavoriteIcon style={{color: '#F06292'}} onClick={removeLikeHandler}/>
                        : <FavoriteBorderIcon onClick={addLikeHandler}/>}
                    <span>{`${like.count} Like`}</span>
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
                    <img src={`http://localhost:8800/images/${currentUser.pPicture}`}/>
                    <textarea className='comment-area' placeholder='Write a comment' rows={2}
                              value={comment} onChange={(e) => {setComment(e.target.value)}} required={true}/>
                    <SendOutlinedIcon className='send-comment-icon' onClick={addComment}/>
                </div>
                {err.postError !== null && err.postError}
                {err.postError === null && <Comments postId={postId} />}
            </div>}
    </div>
}

export default PostItem