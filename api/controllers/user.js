import {db} from "../connect.js";

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