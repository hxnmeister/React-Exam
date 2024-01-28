import mongoose from "mongoose";
import User from "../models/User.mjs";
import Activity from "../models/Activity.mjs";
import Project from "../models/Project.mjs";

const getAll = async (req, res) =>
{
    try
    {
        res.status(200).json(await Project.aggregate(
            [
                {
                    $match: 
                    {
                        user: new mongoose.Types.ObjectId(req.params.id)
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
        ));
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
        const project = new Project(req.body);

        await project.save();
        res.status(200).json(project);
    }
    catch (error)
    {
        res.status(400).json(error);
    }
};

const addActivity = async (req, res) =>
{
    try
    {
        console.log(req.body.id, req.body.activityId);
        res.status(200).json(await Project.findOneAndUpdate
        (
            {
                _id: req.body.id
            },
            {
                $addToSet:
                {
                    activities:
                    {
                        $each: [req.body.activityId]
                    }
                }
            }
        ));
    }
    catch (error)
    {
        res.status(400).json(error);
    }
};

export default { getAll, add, addActivity };