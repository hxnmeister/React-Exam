import jwt from 'jsonwebtoken';

const auth = (req, res, next) =>
{
    try
    {
        const token = req.headers.authorization.split(' ')[1];
        const verifyToken = jwt.verify(token, 'secret');

        req.user = verifyToken;
        next();
    }
    catch (error)
    {
        res.status(400).json
        (
            {
                status: "error",
                message: "invalid token!"
            }
        );
    }
};

export default auth;