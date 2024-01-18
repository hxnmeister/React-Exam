import Activity from "../models/Activity.mjs";

const getAll = async (req, res) =>
{
    res.status(200).json(await Activity.find().exec());
};

const add = async (req, res) =>
{
    try
    {
        const activity = new Activity(req.body);
        await activity.save();

        res.status(200).json(post);
    }
    catch (error)
    {
        res.status(400).json(error);
    }
};

export default { getAll, add };