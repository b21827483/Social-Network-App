export const uploadImage = (req, res) => {
    res.status(200).json(req.file.filename);
}