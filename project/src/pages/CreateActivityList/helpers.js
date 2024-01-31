import { ErrorMessage, Field } from "formik";

export const getContent = (selectedOption) =>
{
    switch(selectedOption)
    {
        case "day":
            return <>
                    <label htmlFor="dayPicker">Choose a day:</label>
                    <Field type="date" id="dayPicker" name="dayPicker"/>
                    <ErrorMessage component="div" name="dayPicker"/>
                </>
        break;
        case "week":
            return <>
                    <label htmlFor="weekPickerStart">Pick start of week:</label>
                    <Field type="date" id="weekPickerStart" name="weekPickerStart"/>
                    <ErrorMessage component="div" name="weekPickerStart"/>
                </>
        break;
        case "month":
            return <>
                    <label htmlFor="monthPicker">Enter month:</label>
                    <Field type="number" id="monthPicker" name="monthPicker" min="1" max="12" placeholder="Range: 1 to 12!"/>
                    <ErrorMessage component="div" name="monthPicker"/>
                </>
    }
}

export const submitHandler = (values, selectedOption, activities, setActivityList) =>
{
    switch(selectedOption)
    {
        case "day":
            Array.isArray(activities) && setActivityList(activities.filter((activity) => 
            {
                const activityDate = new Date(activity.deadline);
                const selectedDate = new Date(values.dayPicker);

                return activityDate.getFullYear() === selectedDate.getFullYear() &&
                    activityDate.getMonth() === selectedDate.getMonth() &&
                    activityDate.getDate() === selectedDate.getDate();
            }));
        break;
        case "week":
            Array.isArray(activities) && setActivityList(activities.filter((activity) => 
            {
                const activityDate = new Date(activity.deadline);
                const weekStart = new Date(values.weekPickerStart);
                const weekEnd = new Date(values.weekPickerEnd);

                return activityDate >= weekStart && activityDate <= weekEnd;
            }));
        break;
        case "month":
            Array.isArray(activities) && setActivityList(activities.filter((activity) => 
            {
                const activityDate = new Date(activity.deadline);
                const selectedDate = new Date(new Date().getFullYear(), values.monthPicker - 1);

                return activityDate.getMonth() === selectedDate.getMonth();
            }));
        break;
    }
};