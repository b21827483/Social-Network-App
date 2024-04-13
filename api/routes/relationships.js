import express from "express";
import {getFollowers, followUser, deleteFollow} from "../controllers/relationship.js";

const router = express.Router();

router.get('/', getFollowers);
router.post('/follow', followUser);
router.post('/unfollow', deleteFollow);

export default router;