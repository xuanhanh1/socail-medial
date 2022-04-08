import React, { useEffect, useState, useContext } from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Paper, Divider } from "@mui/material";
import Grid from "@mui/material/Grid";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import AddTaskTwoToneIcon from "@mui/icons-material/AddTaskTwoTone";
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";
import { db } from "../../../firebase";
import ListFollow from "../../../compoments/Compoment/ListFollow";
import { useDispatch } from "react-redux";
import { login } from "../../../app/reudx/actions";
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

function TestCard({ userData }) {
  const classes = useStyles();
  const [allUser, setAllUser] = useState();

  // console.log("TestCard - userData", userData);
  // useEffect(() => {
  //   console.log("useEffect test card");
  //   if (userData) {
  //     updateListUserSuggest(userData);
  //   }
  // }, [userData]);

  // const updateListUserSuggest = async (userData) => {
  //   let arr = [];

  //   try {
  //     const userList = await db.collection("users").limit(5).get();
  //     if (userList) {
  //       userList.forEach((doc) => {
  //         if (userData && userData.follower) {
  //           const listFollowed = userData.follower;
  //           const uid = doc.data().uid;
  //           if (!listFollowed.includes(uid)) {
  //             arr.push(doc.data());
  //           }
  //         }
  //       });

  //       console.log("arr ", arr);
  //       setAllUser(arr);
  //     }
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // };

  return (
    <>
      <Grid item xs className={classes.listHomePage}>
        <Toolbar>
          <Typography>
            <Item>
              <Box
                sx={{
                  width: "260px",
                  bgcolor: "background.paper",
                  height: "auto",
                }}
              >
                <nav aria-label="main mailbox folders">
                  <div className="test-card-header">
                    <h3>Followers</h3>
                  </div>
                  <Divider />
                  {allUser
                    ? allUser.map((u, index) => {
                        return (
                          <ListFollow
                            userFollow={u}
                            key={index}
                            userInform={userData}
                          />
                        );
                      })
                    : null}
                </nav>
              </Box>
            </Item>
          </Typography>
        </Toolbar>
      </Grid>
    </>
  );
}

export default TestCard;
