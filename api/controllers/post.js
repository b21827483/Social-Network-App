import jwt from "jsonwebtoken";
import moment from "moment";

import {db} from "../connect.js";
import dotenv from 'dotenv'

dotenv.config();

export const getPosts = (req, res) => {

  const token = req.cookies.access_token;
  if (!token) {
      return res.status(401).json("Unauthenticated user.");
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, tokenData) => {
      if (err) {
          return res.status(403).json("Invalid token.");
      }
      const q = `SELECT posts.*, users.id, name, pPicture FROM posts JOIN users ON (users.id = posts.userId)
             LEFT JOIN relationships ON (posts.userId = relationships.followedUserId) WHERE relationships.followerUserId = ? OR users.id = ?
             ORDER BY posts.createdAt DESC`;

      db.query(q, [tokenData.id, tokenData.id] ,(err, data) => {
          if (err) {
              return res.status(500).json(err);
          }
          return res.status(200).json(data);
      })
  })
}

export const addPost = (req, res) => {

    const token = req.cookies.access_token;
    if (!token) {
        return res.status(401).json("Unauthenticated user.");
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, tokenData) => {
        if (err) {
            return res.status(403).json("Invalid token.");
        }
        const q = "INSERT INTO posts (`desc`, `postImage`, `userId`, `createdAt`) VALUES (?)";

        db.query(q, [[req.body.desc, req.body.imageFileName, tokenData.id, moment(Date.now()).format("MMMM Do YYYY, hh:mm:ss")]] ,
            (err, data) => {
            if (err) {
                return res.status(500).json(err);
            }
            return res.status(200).json("Post creation has been successful.");
        })
    })
}

export const getPostImage = (req, res) => {

}
