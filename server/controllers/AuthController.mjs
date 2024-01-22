import User from '../models/User.mjs';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const register = async (req, res) =>
{
    const user = await User.findOne({ email: req.body.email });

    if(user)
    {
        return res.status(400).json
        (
            {
                status: "error",
                message: "such user already exists!"
            }
        );
    }

    try 
    {
        const newUser = new User(req.body);
        const token = jwt.sign({ userId: newUser._id }, 'secret', { expiresIn: '24h' });

        await newUser.save();

        res.status(200).json({ newUser, token });
    } 
    catch (error) 
    {
        res.status(400).json(error);
    }
};

const login = async (req, res) =>
{
    const user = await User.findOne({ email: req.body.email });

    if(!user)
    {
        return res.status(400).json
        (
            {
                status: "error",
                message: "no user with such credentials!"
            }
        );
    }

    const match = await bcrypt.compare(req.body.password, user.password);

    if(!match)
    {
        return res.status(400).json
        (
            {
                status: "error",
                message: "invalid password!"
            }
        );
    }

    const token = jwt.sign({ userId: user._id }, 'secret', { expiresIn: '24h' });

    res.status(200).json({ user, token });
};

const getAuthUser = async (req, res) =>
{
    const { userId } = req.user;
    const user = await User.findById(userId);

    return user ? res.json({ email: user.email, name: user.name }) 
    : res.status(400).json({ status: "error", message: "user not found!" });
};

export default { login, register, getAuthUser };