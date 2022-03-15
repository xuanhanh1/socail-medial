import React, { useEffect, useState } from "react";
import Header from '../containers/Header/Header';
import CompomentLeft from '../containers/CompomentLeft';
import ListFriend from '../compoments/Compoment/ListFriend'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';


function Friend() {
    const [friend, setFriend] = useState(true)
    return (
        <>
            <ListFriend />

        </>
    )
}

export default Friend;
