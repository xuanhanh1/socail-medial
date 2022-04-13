import React, { useEffect, useState, useContext } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import { makeStyles } from "@mui/styles";
import ListNav from "../compoments/Compoment/ListNav";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      {/* <Link color="inherit" href="https://mui.com/"> */}
      Great war dog cat
      {/* </Link>{' '} */}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
function ElevationScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};
const useStyles = makeStyles({
  "@media only screen and (max-width:1024px)": {},
});
function CompomentLeft(props) {
<<<<<<< HEAD
=======
  let trend = props.trend;
>>>>>>> e9896dc73e1ba59c7d6c372a5f2bdaacd42b632a
  const { user } = props;
  const classes = useStyles();

  return (
    <>
      <Grid item xs className={classes.listHomePage}>
        <ElevationScroll {...props}>
          <AppBar>
            <Toolbar sx={{ position: "fixed", top: "70px", left: "9%" }}>
              <Typography>
                <Item>
                  <Box sx={{ width: "240px", bgcolor: "background.paper" }}>
                    <ListNav user={user} />
                  </Box>
                </Item>
              </Typography>
            </Toolbar>
          </AppBar>
        </ElevationScroll>
        <Copyright sx={{ position: "fixed", bottom: 15, left: "5%", ml: 5 }} />
      </Grid>
    </>
  );
}

export default CompomentLeft;
