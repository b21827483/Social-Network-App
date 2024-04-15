import {Fragment, useContext, useState} from "react";
import axios from "axios";

import "../../../styles/UpdateProfile.scss";
import {AuthContext} from "../../context/AuthContext";
import {uploadImageHandler as upload} from "../../utils/ImageUploadUtils";

import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import InstagramIcon from '@mui/icons-material/Instagram';


function UpdateProfile({setIsOpen, userId}) {

    const {currentUser, updateCredentials} = useContext(AuthContext);
    const [pPicture, setPPicture] = useState();
    const [bgPicture, setBgPicture] = useState();
    const [err, setErr] = useState(null);

    function closePopup() {

        let alert: string;
        if (pPicture === undefined && bgPicture === undefined) {
            alert = "You didn't make any changes. Do you still want to exit?"
        }
        if (confirm(alert == undefined ? "Changes are not updated yet. Do you still want to exit?" : alert)) {
            setIsOpen(false);
        }
    }

    console.log(currentUser)

    async function updateProfileHandler() {

        try {
            let profileImageFile = currentUser.pPicture;
            let bgImageFile = currentUser.bgPicture;
            if (pPicture) {
                profileImageFile = await upload(pPicture);
            }
            if (bgPicture) {
                bgImageFile = await upload(bgPicture);
            }
            if (profileImageFile !== null || bgImageFile !== null) {
                await axios.post(`http://localhost:8800/api/users/update/${userId}`, {profileImageFile, bgImageFile}, {
                    withCredentials: true,
                }).then(function (response) {
                    updateCredentials(profileImageFile, bgImageFile);
                    setErr(null);
                    setIsOpen(false);
                    return;
                }).catch(function (e) {
                    setErr(e.message)
                })
            }
            closePopup();
        } catch (e) {
            setErr(e.message)
        }
    }

    return (
        <Fragment>
            <div className='BackgroundProfile' onClick={closePopup} />
            <div className='RootUpdateProfile'>
                {err && err}
                {err === null && <div className='UpdateProfileContent'>
                    <button className='CloseUpdatePopup' onClick={closePopup}>X</button>
                    <div className='UpdateImages'>
                        <div className='ImagesInput'>
                            <label>Profile: </label>
                            <input type='file' id="pFile" style={{display: 'none'}} onChange={(e) => {setPPicture(e.target.files[0])}}/>
                            <label htmlFor="pFile" className='SelectFile'>
                                {pPicture === undefined ? "Select Profile Picture" : pPicture.name.length > 20 ? `${pPicture.name.substring(0, 17)}...`: pPicture.name}
                            </label>
                        </div>

                        <div className='ImagesInput'>
                            <label>Background: </label>
                            <input type='file' id="bgFile" style={{display: 'none'}} onChange={(e) => {setBgPicture(e.target.files[0])}}/>
                            <label htmlFor="bgFile" className='SelectFile'>
                                {bgPicture === undefined ? "Select Background Picture" : bgPicture.name.length > 20 ? `${bgPicture.name.substring(0, 17)}...`: bgPicture.name}
                            </label>
                        </div>

                    </div>
                    <div className='UpdateSocialMedias'>
                        <div className='socialmedia'>
                            <label>Facebook</label>
                            <div className='Input'>
                                <FacebookIcon />
                                <input/>
                            </div>
                        </div>
                        <div className='socialmedia'>
                            <label>Twitter</label>
                            <div className='Input'>
                                <XIcon />
                                <input/>
                            </div>
                        </div>
                        <div className='socialmedia'>
                            <label>Instagram</label>
                            <div className='Input'>
                                <InstagramIcon />
                                <input/>
                            </div>
                        </div>
                    </div>
                    <div className='UpdateAbout'>
                        <label>About</label>
                        <textarea rows={3}/>
                    </div>
                    <button className='UpdateButton' onClick={updateProfileHandler}>Update</button>
                </div>}
            </div>
        </Fragment>
    )
}

export default UpdateProfile