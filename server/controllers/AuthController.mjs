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
                authType: "registration",
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

        res.status(200).json({ user: { id: newUser._id, email: newUser.email, name: newUser.name }, token });
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
                authType: "login",
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
                authType: "login",
                status: "error",
                message: "no user with such credentials!"
            }
        );
    }

    const token = jwt.sign({ userId: user._id }, 'secret', { expiresIn: '24h' });

    res.status(200).json({ user: { id: user._id, email: user.email, name: user.name }, token });
};

const getAuthUser = async (req, res) =>
{
    const { userId } = req.user;
    const user = await User.findById(userId);

    return user ? res.json({ id: user._id, email: user.email, name: user.name }) 
    : res.status(400).json({ status: "error", message: "user not found!" });
};

export default { login, register, getAuthUser };