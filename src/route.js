import React from "react";
import { Navigate, useRoutes } from 'react-router-dom';

import ContainerAnimal from "./Container/Container";
import Trending from './layouts/Trending';
import HomePage from './compoments/HomePage/HomePage';
import Login from './layouts/Login/Login';
import SignUp from './layouts/Login/Register';
import Watch from './layouts/Watch'

export default function Router() {
    return useRoutes([
        {
            path: '/',
            element: <ContainerAnimal />,
            children: [
                { path: '/', element: <HomePage /> },
                { path: 'login', element: <Login /> },
                { path: 'register', element: <SignUp /> },
                { path: 'trend', element: <Trending /> },
                { path: 'watch', element: <Watch /> },
            ]
        }
    ]);

}
