import {useEffect, useState} from "react";

import axios from "axios";

import pp from '../../assets/pp-not-found.png'
import '../../../styles/Posts.scss';
import PostItem from './PostItem';

import ImageIcon from '@mui/icons-material/Image';
import PostCreate from "./PostCreate";

interface Post {
    id: number,
    desc: string,
    postImage: string,
    userId: number,
    name: string,
    userP: string,
}

function Posts() {

    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState<Boolean>(true);
    const [err, setErr] = useState(null);

    useEffect(() => {
        async function getAllPosts() {
            return await axios.get('http://localhost:8800/api/posts', {
                withCredentials: true,
            }).then(function (respond) {
                setPosts(respond.data);
            }).catch(function (err) {
                setErr(err.message)
            });
        }
        getAllPosts();
        setIsLoading(false);
    }, []);

    return <div className='Posts'>
        <PostCreate />
        {posts.map(post => (<PostItem key={post.id} postId={post.id} name={post.name} desc={post.desc} postImg={post.postImage} createdAt={post.createdAt} />))}
        {isLoading && 'Loading...'}
        {err && err}
    </div>
}

export default Posts