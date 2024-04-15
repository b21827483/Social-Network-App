import {db} from "../connect.js";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'

dotenv.config();

export const getUser = (req,res) => {
    const userId = req.params.userId;
    const q = "SELECT * FROM users WHERE users.id = ?";

    db.query(q, [userId], (err, data) => {
        if (err) {
            res.status(500).json(err);
        } else {
            if (data[0] === undefined) {
                return res.status(500).json({message: "There is not such a user with specified id."})
            }
            const {password, email, ...userInfo} = data[0];
            return res.status(200).json(userInfo);
        }
    })
}

export const updateUser = (req, res) => {
    let token = req.cookies.access_token;
    if (!token) {
        return res.status(401).json("Unauthenticated user.");
    }

    jwt.verify(token, process.env.SECRET_KEY, (err, tokenInfo) => {
        if (err || parseInt(req.params.userId) !== tokenInfo.id) {
            return res.status(403).json("Invalid token.");
        }

        const q = "UPDATE users SET `pPicture` = ?, `bgPicture` = ? WHERE (users.id = ?)";
        db.query(q, [req.body.profileImageFile, req.body.bgImageFile, tokenInfo.id], (err, data) => {
            if (err) {
                res.status(500).json(err);
            } else {
                res.status(200).json("Profile successfully updated.")
            }
        })
    })

}