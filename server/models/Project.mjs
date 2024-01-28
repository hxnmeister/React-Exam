import mongoose from "mongoose";

const schema = mongoose.Schema
(
    {
        title:
        {
            type: String,
            required: true,
            unique: true
        },
        activities:
        {
            type: [mongoose.Schema.ObjectId],
            ref: 'Activity'
        },
        user:
        {
            type: mongoose.Schema.ObjectId,
            ref: 'User'
        }
    }
);

export default mongoose.model('project', schema);