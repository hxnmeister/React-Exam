import mongoose from "mongoose";

const schema = mongoose.Schema
(
    {
        title:
        {
            type: String,
            required: true
        },
        deadline:
        {
            type: Date,
            required: true,
            min: new Date(new Date().getTime() + 60 * 60 * 1000)
        },
        description:
        {
            type: String,
            default: "No description!"
        },
        tags:
        {
            type: 
            [
                {
                    type: String,
                    validate:
                    {
                        validator: (line) => /^#\w+/.test(line),
                        message: (props) => `${props.value} doesn't start with '#' symbol!`
                    }
                }   
            ],
            required: true,
            min: 2
        },
        priority:
        {
            type: Number,
            min: 1,
            max: 10,
            default: 1
        }
    }
);

export default mongoose.model('activity', schema);