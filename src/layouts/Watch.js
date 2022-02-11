import React, { useEffect, useState } from "react";
import Header from '../compoments/Header/Header';
import CompomentLeft from '../compoments/Compoment/CompomentLeft';
import ListWatch from '../compoments/Compoment/ListWatch'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';


function Watch() {
    const [watch, setWatch] = useState(true)
    return (
        <>
            <Header />
            <Box sx={{ flexGrow: 1, mt: 6 }}>

                <Grid container spacing={1}>

                    <CompomentLeft
                        watch={watch}
                    />

                    <Grid item xs={9} sx={{ alignItems: 'center' }}>
                        <ListWatch />
                        <ListWatch />
                        <ListWatch />
                        <ListWatch />
                        <ListWatch />
                    </Grid>

                </Grid>
            </Box>

        </>
    )
}

export default Watch;
