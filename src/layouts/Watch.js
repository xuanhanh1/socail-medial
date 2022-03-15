import React, { useEffect, useState } from "react";
import Header from '../containers/Header/Header';
import CompomentLeft from '../containers/CompomentLeft';
import ListWatch from '../compoments/Compoment/ListWatch'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';


function Watch() {
    const [watch, setWatch] = useState(true)
    return (
        <>
            <ListWatch />
            <ListWatch />
            <ListWatch />
            <ListWatch />
            <ListWatch />

        </>
    )
}

export default Watch;
