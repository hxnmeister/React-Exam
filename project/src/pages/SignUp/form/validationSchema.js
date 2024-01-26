import * as Yup from "yup";
import { validation as loginValidation } from "../../Login/form/validationSchema";

const minNameChars = 3;

export const validation = Yup.object().shape
(
    {
        ...loginValidation.fields,
        name: Yup.string().min(minNameChars, `Name must contain at least ${minNameChars} chars!`),
    }
)