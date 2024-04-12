import jwt from "jsonwebtoken";
import dotenv from 'dotenv'

import {db} from "../connect.js";
import {json} from "express";

dotenv.config();

export const getLikes = (req, res) => {

    const token = req.cookies.access_token;

    jwt.verify(token, process.env.SECRET_KEY, (err, tokenData) => {
        const q = "SELECT userId FROM likes WHERE likes.postId = ?";

        db.query(q, [req.query.postId], (e, data) => {
            if (e) {
                res.status(500).json(e);
            } else {
                if (data.find(obj => obj.userId === tokenData.id)) {
                    res.status(200).json({liked: true, count: data.length});
                } else {
                    res.status(200).json({liked: false, count: data.length});
                }
            }
        });
    })
}

export const addLike = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) {
        res.status().json(401).json("Unauthenticated user.");
    }
    jwt.verify(token, process.env.SECRET_KEY, (err, tokenData) => {
        if (err) {
            res.status(403).json("Invalid token");
        }
        const q = "INSERT INTO likes (`userId`, `postId`) VALUES (?)"

        db.query(q, [[tokenData.id, req.body.postId]], (e, data) => {
            if (e) {
                res.status(500).json(e);
            } else {
                res.status(200).json("Like added to the post.");
            }
        })
    })
}

export const deleteLike = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) {
        res.status().json(401).json("Unauthenticated user.");
    }
    jwt.verify(token, process.env.SECRET_KEY, (err, tokenData) => {
        if (err) {
            res.status(403).json("Invalid token");
        }
        const q = "DELETE FROM likes WHERE `userId` = ? AND `postId` = ?"
        db.query(q, [tokenData.id, req.body.postId], (e, data) => {
            if (e) {
                res.status(500).json(e);
            } else {
                res.status(200).json("Like removed from post.");
            }
        })
    })
}