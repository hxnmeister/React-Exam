import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login/Login";

const router = createBrowserRouter
(
    [
        {
            path: '/',
            element: <App/>,
            children:
            [
                {
                    path: '/login',
                    element: <Login/>
                },
                {
                    path: '/signup',
                    element: <h1>register</h1>
                }
            ]
        }
    ]
);

export default router;