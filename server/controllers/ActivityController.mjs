import mongoose from "mongoose";
import User from "../models/User.mjs";
import Activity from "../models/Activity.mjs";

const getAll = async (req, res) =>
{
    try
    {
        res.status(200).json(await Activity.find({user: req.params.id}));
    }
    catch (error)
    {
        res.status(400).json(error);
    }
};

const add = async (req, res) =>
{
    try
    {
        const activity = new Activity(req.body);

        await activity.save();
        res.status(200).json(activity);
    }
    catch (error)
    {
        res.status(400).json({status: "error", error});
    }
};

const remove = async (req, res) =>
{
    try
    {
        await Activity.findByIdAndDelete(req.params.id).exec();
        res.status(200).json
        (
            {
                status: "success",
                message: "activity deleted!"
            }
        );
    }
    catch
    {
        res.status(400).json
        (
            {
                status: "error",
                message: "cannot find activity to remove!"
            }
        );
    }
};

const update = async (req, res) =>
{
    try
    {
        Activity.findByIdAndUpdate(req.params.id, req.body).exec();
        res.status(200).json
        (
            {
                status: "success",
                message: "activity successfully updated!"
            }
        );
    }
    catch
    {
        res.status(400).json
        (
            {
                status: "error",
                message: "cannot find activity to update!"
            }
        );
    }
};

const searchByTag = async (req, res) =>
{
    try
    {
        const temp = await Activity.aggregate(
            [
                {
                    $match: 
                    {
                        user: new mongoose.Types.ObjectId(req.body.userId),
                        tags: 
                        {
                            $elemMatch: 
                            {
                                $eq: req.body.searchingTag
                            }
                        }
                    }
                },
                {
                    $lookup: 
                    {
                        from: 'activities',
                        localField: 'activities',
                        foreignField: '_id',
                        as: 'activities_list'
                    }
                }
            ]
        )

        console.log(temp);
        res.status(200).json(temp);
    }
    catch (error)
    {
        console.log(error);
    }
};

export default { getAll, add, remove, update, searchByTag };