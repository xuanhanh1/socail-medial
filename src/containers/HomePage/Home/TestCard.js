import React, { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
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
import { compareFollowerId } from "../../../compoments/FunCompoments/Function";
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

function TestCard(props) {
  const classes = useStyles();
  const [allUsers, setAllUsers] = useState();
  const { user } = props;
  const [isChanged, setIsChanged] = useState();
  const [show, setShow] = useState(false);
  let location = useLocation();

  useEffect(() => {
    if (location.pathname === "/friend") {
      setShow(true);
    }
  }, []);

  useEffect(() => {
    if (user) {
      getAllUsers(user);
    } else {
      getAllUsers();
    }
  }, [user, isChanged]);

  const getAllUsers = (user) => {
    let arr = [];
    if (user && user.follower) {
      db.collection("users")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots

            let compareFollow = compareFollowerId(
              user.follower,
              doc.data().uid
            );
            if (user.uid == doc.data().uid || compareFollow.result) {
              // console.log(11);
            } else {
              arr.push(doc.data());
            }
          });
          setAllUsers(arr);
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    } else {
      db.collection("users")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            arr.push(doc.data());
          });
          setAllUsers(arr);
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
    }
  };

  const handleFollow = () => {
    setIsChanged(!isChanged);
  };

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
                  {allUsers
                    ? allUsers.map((u, index) => {
                        return (
                          <ListFollow
                            userFollow={u}
                            key={index}
                            user={user}
                            ParentHandleFollow={handleFollow}
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
