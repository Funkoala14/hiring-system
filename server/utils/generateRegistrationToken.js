import jwt from 'jsonwebtoken';

const { JWT_SECRET } = process.env;

const generateRegistrationToken = (email) => {
    const token = jwt.sign(
        { email, issuedAt: Date.now() }, // Add a timestamp to make it unique
        JWT_SECRET,
        {
            expiresIn: '3h',
        }
    );
    return token;
};

export default generateRegistrationToken;
