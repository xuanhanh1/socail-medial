import React from "react";
import { Navigate, useRoutes } from 'react-router-dom';
import Home from "./layouts/Home"
import Trending from './layouts/Trending';
import HomePage from './containers/HomePage/HomePage';
import Login from './layouts/Login/Login';
import SignUp from './layouts/Login/Register';
import DefaultLayout from './layouts/DefaultLayout';
import Watch from './layouts/Watch';
import Friend from './layouts/Friend';
import Profile from './Profile/Profile';
import Message from './layouts/Messenger'

export default function Router() {
    return useRoutes([

        {
            path: '/',
            element: <HomePage />,
            children: [
                { path: '/', element: <Home /> },
                { path: 'trend', element: <Trending /> },
                { path: 'watch', element: <Watch /> },
                { path: 'friend', element: <Friend /> },

            ]
        },
        {
            path: '/profile',
            element: <Profile />,
            children: [
                { path: 'profile', element: <Profile /> },

            ]
        },
        {
            path: '/',
            element: <DefaultLayout />,
            children: [

                { path: 'login', element: <Login /> },
                { path: 'register', element: <SignUp /> },
            ]
        },
        {
            path: '/message',
            element: <Message />,
        }

    ]);

}
