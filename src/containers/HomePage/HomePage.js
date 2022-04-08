import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Home from "./Home/Home";
import Container from "@mui/material/Container";
import { Outlet } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import PropTypes from "prop-types";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Header from "../Header/Header";
import CompomentLeft from "../CompomentLeft";
import { makeStyles } from "@mui/styles";
import TestCard from "./Home/TestCard";
import { useSelector } from "react-redux";
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

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
  mainMobile: {
    display: "none",
  },
  "@media only screen and (max-width:1024px)": {
    main: {
      display: "none",
    },
    mainMobile: {
      display: "block",
    },
  },
  "@media only screen and (max-width:740px)": {
    contai: {
      padding: "0 !important",
      paddingLeft: "0 !important",
      paddingRight: "0 !important",
    },
    mainMobile: {
      padding: "0 !important",
      paddingLeft: "0 !important",
      paddingRight: "0 !important",
    },
  },
});
function HomePage() {
  const userInfor = useSelector((state) => state.userInfor);
  const [user, setUser] = useState();
  const classes = useStyles();

  useEffect(() => {
    if (userInfor) {
      setUser(userInfor);
    } else {
      setUser();
    }
  }, [userInfor]);

  return (
    <>
      <div className="bd">
        <div style={{ backgroundColor: "#e2e8f0" }}>
          <div className={classes.contai}>
            <Header user={user} />
            <Box sx={{ flexGrow: 1, mt: 6 }} className={classes.main}>
              <CssBaseline />
              <Grid container spacing={1}>
                <Grid item xs>
                  <CompomentLeft user={user} />
                </Grid>
                <Grid item xs={6} sx={{ alignItems: "center" }}>
                  <Item>
                    <Outlet context={user} />
                  </Item>
                </Grid>
                <Grid item xs>
                  <TestCard userData={user} />
                </Grid>
              </Grid>
            </Box>
            <Box sx={{ flexGrow: 1, mt: 6 }} className={classes.mainMobile}>
              <CssBaseline />
              <Grid container spacing={1} className={classes.contai}>
                <Grid item xs={12} sx={{ alignItems: "center" }}>
                  <Item>
                    <Outlet context={user} />
                  </Item>
                </Grid>
              </Grid>
            </Box>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
