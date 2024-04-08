import bcrypt from 'bcrypt';

export function hashPassword(password) {
    const salt = bcrypt.genSaltSync(10);
    const hashedPW = bcrypt.hashSync(password, salt);
    return hashedPW;
};

export function compareHashedPW(password, hashedPW) {
    return bcrypt.compareSync(password, hashedPW);
}