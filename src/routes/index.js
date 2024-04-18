import Login from "pages/Auth";
import Register from "pages/Auth/Register";
import Home from "pages/Home";

export const publicRoutes = [
    {
        key: "login",
        path: "/",
        Component: Login
    },
    {
        key: "register",
        path: "/register",
        Component: Register
    }
]

export const privateRoutes = [
    {
        key: "home",
        path: "/",
        Component: Home
    }
]