import jwt from 'jsonwebtoken';

const { JWT_SECRET } = process.env;

const generateToken = (data) => {
    const token = jwt.sign({ ...data }, JWT_SECRET, {
        expiresIn: '1h',
    });
    return token;
};

export default generateToken;
