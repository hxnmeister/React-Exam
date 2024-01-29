import mongoose from "mongoose";
import Project from "../models/Project.mjs";

const fetchProjectsByUserId = async (userId) =>
{
    return await Project.aggregate(
        [
            {
                $match: 
                {
                    user: new mongoose.Types.ObjectId(userId)
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
    );
};

const getAll = async (req, res) =>
{
    try
    {
        res.status(200).json(await fetchProjectsByUserId(req.params.id));
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
        await Project.findOneAndUpdate
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
            },
            {
                new: true
            }
        );

        res.status(200).json(await Project.aggregate(
            [
                {
                    $match: 
                    {
                        _id: new mongoose.Types.ObjectId(req.body.id)
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

const remove = async (req, res) =>
{
    try
    {
        const project = await Project.findOne(new mongoose.Types.ObjectId(req.params.id));

        if(project)
        {
            const userId = project.user;

            await project.deleteOne();
            res.status(200).json(await fetchProjectsByUserId(userId));
        }
    }
    catch (error)
    {
        console.log(error);
    }
};

export default { getAll, add, addActivity, remove };