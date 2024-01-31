import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import Home from "../pages/Home/Home";
import CreateActivity from "../pages/CreateActivity/CreateActivity";
import Projects from "../pages/Projects/Projects";
import CreateProject from "../pages/CreateProject/CreateProject";
import SearchResults from "../pages/SearchResults/SearchResults";
import CreateActivityList from "../pages/CreateActivityList/CreateActivityList";

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
                },
                {
                    path: '/create-project',
                    element: <CreateProject/>
                },
                {
                    path: '/search-by-tag/:tag',
                    element: <SearchResults/>
                },
                {
                    path: 'create-activities-list',
                    element: <CreateActivityList/>
                }
            ]
        }
    ]
);

export default router;