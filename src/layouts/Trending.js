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
            <Header />
            <Box sx={{ flexGrow: 1, mt: 6 }}>

                <Grid container spacing={1}>

                    <CompomentLeft
                        trend={trend}
                    />

                    <Grid item xs={9} sx={{ alignItems: 'center', }}>
                        <ListImageTrending />
                    </Grid>

                </Grid>
            </Box>

        </>
    )
}

export default Trending;
