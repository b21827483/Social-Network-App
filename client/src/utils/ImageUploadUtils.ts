import axios from "axios";

export async function uploadImageHandler(img) {
    const formData = new FormData();
    formData.append("image_file", img);
    const res = await axios.post("http://localhost:8800/api/image-uploads", formData);
    return res.data;
}