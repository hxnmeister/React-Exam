import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import Home from "../pages/Home/Home";

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
                }
            ]
        }
    ]
);

export default router;