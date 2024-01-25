import { validation as additionValidation } from "../../Login/form/validationRules";

export const validation = (values) =>
{
    const errors = additionValidation(values);

    if(!values.name)
    {
        errors.name = "Name is required!";
    }
    else if(values.name.length < 3)
    {
        errors.name = "Name is too short!";
    }

    return errors;
}