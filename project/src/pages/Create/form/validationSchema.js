import * as Yup from "yup";

const minSizeForTags = 2;
const minForTitle = 5;
const minForDesc = 10;
const minForPriority = 1;
const maxForPriority = 10;

export const validation = Yup.object().shape
(
    {
        title: Yup.string()
            .min(minForTitle, `At least ${minForTitle} chars!`)
            .required("Title is required!"),
        description: Yup.string()
            .min(minForDesc, `At least ${minForDesc} chars!`),
        priority: Yup.number()
            .integer("Priority must be an integer!")
            .min(minForPriority, `Priority must be at least ${minForPriority}!`)
            .max(maxForPriority, `Priority must be at most ${maxForPriority}!`)
            .required("Priority is required!"),
        deadline: Yup.date()
            .min(new Date(new Date().getTime() + 60 * 60 * 1000), 'Deadline must be at least 1 hour from now!')
            .required("Deadline is required!"),
        tags: Yup.array()
            .of(Yup.string().required("Tag is required!"))
            .min(minSizeForTags, `At least ${minSizeForTags} tags required!`)
    }
);