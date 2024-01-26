export const initialValues = 
{
    title: "Simple Title",
    description: "Some text for description activity!",
    priority: 1,
    deadline: new Date(new Date().getTime() + 4 * 60 * 60 * 1000).toISOString().slice(0, 16),
    tags: ["#tag1"]
};