import jwt from "jsonwebtoken";
import {db} from "../connect.js";
import moment from "moment";

export const getComments = (req, res) => {
    const token = req.cookies.access_token;
    if (!token) {
        res.status(401).json("Unauthenticated user.");
    }

    const q = "SELECT comments.*, users.name, users.pPicture FROM comments JOIN users ON (users.id = comments.userId) WHERE comments.postId = ? ORDER BY comments.createdAt DESC"

    db.query(q, [req.query.postId], (err, data) => {
        if (err) {
            res.status(500).json(err)
        }
        return res.status(200).json(data);
    })
}

export const addComment = (req, res) => {
    console.log(req.body)
    const token = req.cookies.access_token;
    if (!token) {
        return res.status(401).json("Unauthenticated user.");
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, tokenData) => {
        if (err) {
            return res.status(403).json("Invalid token.");
        }
        const q = "INSERT INTO comments (`desc`, `postId`, `userId`, `createdAt`) VALUES (?)";

        db.query(q, [[req.body.comment, req.body.postId, tokenData.id, moment(Date.now()).format("MMMM Do YYYY, hh:mm:ss")]],
            (err, data) => {
                if (err) {
                    console.log(err)
                    return res.status(500).json(err);
                }
                return res.status(200).json("Comment creation has been successful.");
            })
    })
}