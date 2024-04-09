import {db} from '../connect.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import {compareHashedPW, hashPassword} from "../utils/passwordUtils.js";

dotenv.config();

export const signup = (req,res) => {
    const {username, email, name, password} = req.body;

    const q = "SELECT * FROM users WHERE username = ?";
    db.query(q, [username], (error, data) => {

        if (error) {
            return res.status(500).json(error);
        }

        if (!name || name.trim().length === 0 ||
            !email || email.trim().length === 0 ||
            !username || username.trim().length === 0 ||
            !password || password.trim().length === 0) {

            return res.status(400).json("Invalid input.")
        }

        if (data.length) {
            return res.status(409).json('User already exists.');
        }

        const hashedPassword = hashPassword(password);
        const q = "INSERT INTO users (`name`, `email`, `username`, `password`) VALUE (?)";
        db.query(q, [[name, email, username, hashedPassword]], (error, data) => {
            if (error) {
                return res.status(500).json(error);
            }
            return res.status(200).json("User has been created.");
        })
    })


}

export const login = (req,res) => {

    const q = "SELECT * FROM users WHERE username = ?";

    const {username, password} = req.body;

    db.query(q, [username], (error, data) => {
        if (error) {
            return res.status(500).json(error);
        }

        if (!username || username.trim().length === 0 ||
            !password || password.trim().length === 0) {

            return res.status(400).json("Invalid input.")
        }

        if (data.length === 0) {
            return res.status(404).json('User not found.')
        }

        const isPasswordValid = compareHashedPW(password, data[0].password)

        if (!isPasswordValid) {
            return res.status(400).json("Invalid password or username.");
        }

        const token = jwt.sign({id:data[0].id}, process.env.SECRET_KEY);
        const {password: registeredPassword, ...userInfo} = data[0];

        res.cookie('access_token', 'Bearer ' + token, {
            httpOnly: true,
        }).status(200).json(userInfo);
    })
}

export const logout = (req, res) => {
    res.clearCookie('access_token', {
        secure: true,
        sameSite: "none",
    }).status(200).json("Logged out.")
}