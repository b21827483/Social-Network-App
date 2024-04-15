import {useContext, useState} from "react";

import axios from "axios";

import {AuthContext} from "../../context/AuthContext";
import {uploadImageHandler} from "../../utils/ImageUploadUtils";

import ImageIcon from "@mui/icons-material/Image";

function PostCreate() {

    const {currentUser} = useContext(AuthContext);
    const [desc, setDesc] =useState("");
    const [postImage, setPostImage] = useState<File>(null);
    const [err, setErr] = useState(null);

    async function createPostHandler(event) {
        event.preventDefault();
        try {
            let imageFileName;
            if (postImage) {
                imageFileName = await uploadImageHandler(postImage);
            }
            await axios.post("http://localhost:8800/api/posts", {desc, imageFileName}, {
                withCredentials: true,
            });
            setDesc("");
            setPostImage(null);
        }
        catch (e) {
            setErr(e);
        }
    }

    return (
        <div className='AddPost'>
            <div className='currentUserInfo'>
                <img src={`http://localhost:8800/images/${currentUser.pPicture}`}/>
                <textarea className='postArea' type='text' placeholder='Share some posts' rows={4} value={desc}
                          onChange={(e) => {setDesc(e.target.value)}}/>
            </div>
            {postImage &&
                <div className='postImage'>
                    <div />
                    <img src={URL.createObjectURL(postImage)} alt='Uploaded Image'/>
                </div>}
            <div className='postActions'>
                <input
                    type="file"
                    id="file"
                    onChange={(e) => {setPostImage(e.target.files[0])}}/>
                <div />
                <label htmlFor='file'>
                    <div className='uploadImage'>
                        <ImageIcon fontSize={"large"} type='file' />
                        <span>Upload Image</span>
                    </div>
                </label>
            </div>
            <div className='sendPost'>
                {err && err}
                <button onClick={createPostHandler}>Post</button>
            </div>
        </div>
    )
}

export default PostCreate