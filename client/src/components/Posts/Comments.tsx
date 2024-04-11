import {useEffect, useState} from "react";

import axios from "axios";

import '../../../styles/Comments.scss';
import CommentItem from "./CommentItem";

function Comments({postId}) {

    const [comments, setComments] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [err, setErr] = useState();

    useEffect(() => {
        async function getPostComments() {
            await axios.get(`http://localhost:8800/api/comments?postId=${postId}`, {
                withCredentials: true,
            }).then(function (respond) {
                setComments(respond.data);
                setIsLoading(false);
                setErr(null)
            }).catch(function (e) {
                setErr(e);
            });
        }
        getPostComments();
    }, [])

    return  (
        <div className='Comments'>
            <ul>
                {isLoading ? 'Loading' : comments.map(comment => (
                    <li key={comment.id}>
                        <CommentItem
                            name={comment.name}
                            pp={comment.pPicture}
                            comment={comment.desc}
                            createdAt={comment.createdAt}/>
                    </li>
                ))}
            </ul>
            {err && err}
        </div>
    )
}

export default Comments