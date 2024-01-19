import mongoose from "mongoose";

const schema = mongoose.Schema
(
    {
        name:
        {
            type: String,
            required: true
        },
        email:
        {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            validate:
            {
                validator: (value) => /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-z]{2,7}$/.test(value),
                message: (props) => `${props.value} is not a valid email address!`
            }
        },
        password:
        {
            type: String,
            required: true,
            min: 8,
            validate:
            {
                validator: (value) => /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/.test(value),
                message: () => `Password must be at least 8 chars and contain one uppercase letter, one special char and one number!`
            }
        }
    }
);

export default mongoose.model('user', schema);