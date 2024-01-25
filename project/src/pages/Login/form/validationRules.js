export const validation = (values) =>
{
    const errors = {};

    if(!values.email)
    {
        errors.email = "Email field is required!";
    }
    else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email))
    {
        errors.email = "Invalid email address!";
    }

    if(!values.password)
    {
        errors.password = "Password field is required";
    }
    else if(!/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/.test(values.password))
    {
        errors.password = "Password must be at least 8 chars and contain at least one uppercase letter, special char and number!";
    }

    if(!values.repeatPassword || !values.repeatPassword.includes(values.password))
    {
        errors.repeatPassword = "Passwords must match!";
    }

    return errors;
}