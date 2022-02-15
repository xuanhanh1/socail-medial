import React, { useEffect, useState } from "react";
import Header from '../compoments/Header/Header';
import CompomentLeft from '../compoments/Compoment/CompomentLeft';
import ListImageTrending from '../compoments/Compoment/ListImageTrending';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

function Trending() {
    const [trend, setTrend] = useState(true)
    return (
        <>

            <ListImageTrending />
            <ListImageTrending />
            <ListImageTrending />
        </>
    )
}

export default Trending;
