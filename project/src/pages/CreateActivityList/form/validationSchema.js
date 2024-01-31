const minMonth = 1;
const maxMonth = 12;

export const validation = (values) => {
    const errors = {};

    if (values.listBy === 'day') 
    {
        if (!values.dayPicker) 
        {
            errors.dayPicker = 'Day is required!';
        }
    } 
    else if (values.listBy === 'week') 
    {
        if (!values.weekPickerStart) 
        {
            errors.weekPickerStart = 'Week start is required!';
        } 
        else if (!values.weekPickerEnd) 
        {
            errors.weekPickerEnd = 'Week end is required!';
        } 
        else if (new Date(values.weekPickerEnd) - new Date(values.weekPickerStart) !== 6 * 24 * 60 * 60 * 1000) 
        {
            errors.weekPickerEnd = 'Invalid week range';
        }
    } 
    else if (values.listBy === 'month') 
    {
        if (!values.monthPicker) 
        {
            errors.monthPicker = 'Month is required!';
        }
        else if(values.monthPicker < minMonth)
        {
            errors.monthPicker = `Minimal value for month is ${minMonth}!`;
        }
        else if(values.monthPicker > maxMonth)
        {
            errors.monthPicker = `Maximum value for month is ${maxMonth}!`;
        }
    }
    return errors;
};