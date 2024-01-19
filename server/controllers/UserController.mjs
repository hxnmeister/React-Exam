import User from "../models/User.mjs";

const getAll = async (req, res) =>
{
    res.status(200).json(await User.find().exec());
};

export default { getAll };