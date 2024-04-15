import express from "express";
import {uploadImage} from "../controllers/image-upload.js";
import {imageUpload as storage} from "../storage.js";

const router = express.Router();

router.post('/', storage.single("image_file"), uploadImage);

export default router;