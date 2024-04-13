import jwt from "jsonwebtoken";
import {db} from "../connect.js";

export const getFollowers = (req, res) => {
  const q = "SELECT followerUserId FROM relationships WHERE followedUserId = ?";

  db.query(q, [req.query.followedUserId], (err, data) => {
      if (err) {
          res.status(500).json(err);
      } else {
          res.status(200).json(data.map(obj => (obj.followerUserId)));
      }
  })
}

export const followUser = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) {
        res.status(401).json("Unauthenticated user.")
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, tokenInfo) => {
        if (err) {
            return res.status(403).json("Invalid token.");
        }

        const q = "INSERT INTO relationships (`followerUserId`, `followedUserId`) VALUES (?)"
        db.query(q, [[tokenInfo.id, req.body.followedUserId]], (err, data) => {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).json("Successfully followed.")
            }
        })
    })
}

export const deleteFollow = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) {
        res.status(401).json("Unauthenticated user.")
    }
    jwt.verify(token, process.env.SECRET_KEY, (err, tokenInfo) => {
        if (err) {
            return res.status(403).json("Invalid token.");
        }

        const q = "DELETE FROM relationships WHERE followerUserId = ? AND followedUserId = ?"

        db.query(q, [tokenInfo.id, req.body.followedUserId], (err, data) => {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).json("Successfully unfollowed.")
            }
        })
    })
}