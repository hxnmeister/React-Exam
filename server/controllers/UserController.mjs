import User from "../models/User.mjs";

const getAll = async (req, res) =>
{
    res.status(200).json(await User.find().exec());
};

const getUserById = async (req, res) =>
{
    try
    {
        const userData = await User.findById(req.params.id);

        res.status(200).json
        (
            {
                name: userData.name,
                email: userData.email
            }
        );
    }
    catch
    {
        res.status(400).json
        (
            {
                status: "error",
                message: "such user is not exists!"
            }
        );
    }
};

export default { getAll, getUserById };