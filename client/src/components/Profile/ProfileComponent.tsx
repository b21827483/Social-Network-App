import {Fragment, useContext, useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import axios from "axios";

import '../../../styles/Profile.scss';

import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import {AuthContext} from "../../context/AuthContext";

type User = {
    id: number | null,
    name: string | null,
    pPicture: string | null,
    bgPicture: string | null,
}

function ProfileComponent() {

    const {currentUser} = useContext(AuthContext);

    const [user, setUser] = useState<User>({
        id: null,
        name: null,
        pPicture: null,
        bgPicture: null
    });
    const [isFollowing, setIsFollowing] = useState<boolean>();
    const [isLoading, setIsLoading] = useState(true);
    const [err, setErr] = useState({
        userError: null,
        followError: null
    });

    const userId = parseInt(useLocation().pathname.split('/')[2]);

    useEffect(() => {
        async function getUserHandler() {
            await axios.get(`http://localhost:8800/api/users/user/${userId}`)
                .then(function (response) {
                    let bgPicture = response.data.bgPicture;
                    let pPicture = response.data.pPicture;
                    if (response.data.bgPicture === null || response.data.bgPicture === undefined) {
                        bgPicture = `default_background.jpg`;
                    }
                    if (response.data.pPicture === null || response.data.pPicture === undefined) {
                        pPicture = `pp-not-found.png`;
                    }
                    setUser({...response.data, bgPicture: bgPicture, pPicture: pPicture});
                    setErr(prevState => ({...prevState, userError: null}));
                }).catch(function (e) {
                    if (e.response.data.message) {
                        setErr(prevState => ({...prevState, userError: e.response.data.message}));
                    } else {
                        setErr(prevState => ({...prevState, userError: e.message}));
                    }
                })
        }

        async function getFollowHandler() {
            await axios.get(`http://localhost:8800/api/relationships?followedUserId=${userId}`)
                .then(function (response) {
                    if (response.data.some(id => (id === currentUser.id))) {
                        setIsFollowing(true);
                    } else {
                        setIsFollowing(false);
                    }
                    setErr(prevState => ({...prevState, followError: null}));
                })
                .catch(function (e) {
                    setErr(prevState => ({...prevState, followError: e.message}));
                })
        }

        getUserHandler();
        setIsLoading(false);
        getFollowHandler()
    }, [])

    async function addFollowHandler() {
        console.log("addfollowhandler")
        await axios.post("http://localhost:8800/api/relationships/follow", {followedUserId: userId}, {
            withCredentials: true,
        }).then(function (response) {
            setIsFollowing(true);
            setErr(prevState => ({...prevState, followError: null}));
        }).catch(function (e) {
            setErr(prevState => ({...prevState, followError: e.message}));
        })
    }

    async function deleteFollowHandler() {
        console.log("deletefollowhandler")
        await axios.post("http://localhost:8800/api/relationships/unfollow", {followedUserId: userId}, {
            withCredentials: true,
        }).then(function (response) {
            setIsFollowing(false);
            setErr(prevState => ({...prevState, followError: null}));
        }).catch(function (e) {
            setErr(prevState => ({...prevState, followError: e.message}))
        })
    }

    const pass = !isLoading && err.userError === null;

    return <Fragment>
        {isLoading && "Loading..."}
        {err.userError && err.userError}
        {pass && <div className='Profile'>
            <div className='Images'>
                <img className='background'
                     src = {`http://localhost:8800/images/${user.bgPicture}`}/>
                <img className='pp' src={`http://localhost:8800/images/${user.pPicture}`}/>
            </div>
            <div className='ProfileContainer'>
                <div className='UserInfo'>
                    <div className='OtherSocialMedias'>
                        <a>
                            <FacebookIcon/>
                        </a>
                        <a>
                            <XIcon/>
                        </a>
                        <a>
                            <InstagramIcon/>
                        </a>
                    </div>
                    <div className='About'>
                        <h2 className='Name'>{user.name}</h2>
                        {err.followError && err.followError}
                        {err.followError === null && currentUser.id === userId && !isFollowing ? <button className='UpdateProfileButton'>Update Profile</button> :
                            isFollowing ? <button className='FollowButton' onClick={deleteFollowHandler}>Unfollow</button> :
                                <button className='FollowButton' onClick={addFollowHandler}>Follow</button>}
                    </div>
                    <div className='Actions'>
                        <MailOutlineIcon/>
                        <MoreHorizIcon/>
                    </div>
                </div>
            </div>
        </div>
        }
    </Fragment>
}

export default ProfileComponent