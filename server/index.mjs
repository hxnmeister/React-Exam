import express from "express";
import cors from "cors";
import dbConnection from "./db/index.mjs";
import activityRoutes from "./routes/activities.mjs";

const app = express();

dbConnection.on('connected', () => console.log("DB successfully connected!"));
dbConnection.on('error', () => console.log("DB connection failed!"));

app.use(express.json());

app.use('', activityRoutes);

app.get('/', (req, res) => 
{
    res.status(200).send("<h1>Home page</h1>")
});

app.listen(process.env.PORT, () => 
{
    console.log(`Example app listening on port ${process.env.PORT}`)
});