import {useContext, useState} from "react";

import ImageIcon from "@mui/icons-material/Image";
import {AuthContext} from "../../context/AuthContext";
import axios from "axios";

function PostCreate() {

    const {currentUser} = useContext(AuthContext);
    const [desc, setDesc] =useState("");
    const [postImage, setPostImage] = useState<File>(null);
    const [err, setErr] = useState(null);

    async function uploadImageHandler() {
        const formData = new FormData();
        formData.append('image_file', postImage);
        console.log(formData.get('image_file'))
        const res = await axios.post("http://localhost:8800/api/image-uploads", formData);
        return res.data;
    }

    async function createPostHandler(event) {
        event.preventDefault();
        try {
            let imageFileName;
            if (postImage) {
                imageFileName = await uploadImageHandler();
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
                <img src={currentUser.pPicture}/>
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