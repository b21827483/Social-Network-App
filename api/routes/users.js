import express from "express";
import {getUser, updateUser} from "../controllers/user.js";

const router = express.Router();

router.get('/user/:userId', getUser);
router.post('/update/:userId', updateUser);

export default router