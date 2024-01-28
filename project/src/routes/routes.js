import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import Home from "../pages/Home/Home";
import CreateActivity from "../pages/CreateActivity/CreateActivity";
import Projects from "../pages/Projects/Projects";

const router = createBrowserRouter
(
    [
        {
            path: '/',
            element: <App/>,
            children:
            [
                {
                    path: '/',
                    element: <Home/>
                },
                {
                    path: '/login',
                    element: <Login/>
                },
                {
                    path: '/signup',
                    element: <SignUp/>
                },
                {
                    path: '/create-activity',
                    element: <CreateActivity/>
                },
                {
                    path: '/projects',
                    element: <Projects/>
                }
            ]
        }
    ]
);

export default router;