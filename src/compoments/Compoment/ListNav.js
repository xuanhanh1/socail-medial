import React, { useEffect, useState, useContext } from "react";
import { ListItemIcon, Divider } from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import Avatar from "@mui/material/Avatar";
import PeopleIcon from "@mui/icons-material/People";
import MapsUgcOutlinedIcon from "@mui/icons-material/MapsUgcOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import VideocamTwoToneIcon from "@mui/icons-material/VideocamTwoTone";
import HomeIcon from "@mui/icons-material/Home";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  "@media only screen and (max-width:1024px)": {},
  active: {
    backgroundColor: "#77BDD9",
  },
});
function ListNav(props) {
  let trend = props.trend;
  const { user } = props;
  const classes = useStyles();
  const [isActive, setIsActive] = useState();
  const navigate = useNavigate();

  const tabSelected = (e) => {
    let currentValue = e.currentTarget.value;
    setIsActive(currentValue);
  };

  return (
    <nav aria-label="main mailbox folders">
      <List>
        {user && user.displayName ? (
          <>
            <ListItem disablePadding>
              <Link to="profile">
                <ListItemButton>
                  <ListItemIcon>
                    <Avatar
                      alt="Remy Sharp"
                      src={user.photoURL ? user.photoURL : ""}
                    ></Avatar>
                  </ListItemIcon>
                  <ListItemText primary={user.displayName} />
                </ListItemButton>
              </Link>
            </ListItem>
            <Divider />
            <Divider />
            <Divider />
          </>
        ) : (
          <>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <Link to="/">
                  <ListItemText primary="Home" />
                </Link>
              </ListItemButton>
            </ListItem>
            <Divider />
            <Divider />
            <Divider />
          </>
        )}
      </List>

      <List>
        <ListItem
          disablePadding
          onClick={(e) => {
            tabSelected(e);
          }}
          value="1"
          className={isActive === 1 ? classes.active : ""}
        >
          <ListItemButton>
            <ListItemIcon>
              <WhatshotIcon color="secondaryDark" />
            </ListItemIcon>
            <Link to="trend">
              <ListItemText primary="Trending" />
            </Link>
          </ListItemButton>
        </ListItem>

        <ListItem
          disablePadding
          onClick={(e) => {
            tabSelected(e);
          }}
          value="2"
          className={isActive === 2 ? classes.active : ""}
        >
          <ListItemButton>
            <ListItemIcon>
              <VideocamTwoToneIcon color="secondaryLight" />
            </ListItemIcon>
            <Link to="watch">
              <ListItemText primary="Watch" />
            </Link>
          </ListItemButton>
        </ListItem>
        {user && user.displayName ? (
          <ListItem
            disablePadding
            onClick={(e) => {
              tabSelected(e);
            }}
            value="3"
            className={isActive === 3 ? classes.active : ""}
          >
            <ListItemButton>
              <ListItemIcon>
                <PeopleIcon color="secondaryLight" />
              </ListItemIcon>
              <Link to="friend">
                <ListItemText primary="Friend" />
              </Link>
            </ListItemButton>
          </ListItem>
        ) : (
          ""
        )}
        {user && user.displayName ? (
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <MapsUgcOutlinedIcon color="secondaryLight" />
              </ListItemIcon>
              <Link to="/message">
                <ListItemText primary="Message" />
              </Link>
            </ListItemButton>
          </ListItem>
        ) : (
          ""
        )}
        {user && user.displayName ? (
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <SettingsOutlinedIcon color="backgroundColorDark" />
              </ListItemIcon>
              <Link to="/profile">
                <ListItemText primary="Setting" />
              </Link>
            </ListItemButton>
          </ListItem>
        ) : (
          ""
        )}
      </List>
    </nav>
  );
}

export default ListNav;
