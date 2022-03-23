import React, { useEffect, useState, useContext } from "react";
import { ListItemIcon, Divider, ListIcon } from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import Avatar from "@mui/material/Avatar";
import AddTaskTwoToneIcon from "@mui/icons-material/AddTaskTwoTone";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  "@media only screen and (max-width:1024px)": {},
  active: {
    backgroundColor: "#77BDD9",
  },
});
function ListFollow(props) {
  const userInfor = useSelector((state) => state.userInfor);
  const [user, setUser] = React.useState();
  const classes = useStyles();
  const [isActive, setIsActive] = useState();

  const tabSelected = (e) => {
    let currentValue = e.currentTarget.value;
    setIsActive(currentValue);
  };

  return (
    <nav aria-label="main mailbox folders">
      <div className="test-card-header">
        <h3>Followers</h3>
      </div>
      <Divider />
      <List>
        <ListItem disablePadding>
          <Link to="profile">
            <ListItemButton>
              <ListItemIcon>
                <Avatar alt="Remy Sharp">R</Avatar>
              </ListItemIcon>
              <ListItemText primary="Xuan Hanh" secondary="Follow" />
            </ListItemButton>
            <div className="follow-icon">
              <AddTaskTwoToneIcon color="secondaryLight" />
            </div>
          </Link>
        </ListItem>
        <Divider />
        <Divider />
        <Divider />
      </List>
      <List>
        <ListItem disablePadding>
          <Link to="profile">
            <ListItemButton>
              <ListItemIcon>
                <Avatar alt="Remy Sharp">R</Avatar>
              </ListItemIcon>
              <ListItemText primary="Xuan Hanh" secondary="Follow" />
            </ListItemButton>
            <div className="follow-icon">
              <AddTaskTwoToneIcon color="secondaryLight" />
            </div>
          </Link>
        </ListItem>
        <Divider />
        <Divider />
        <Divider />
      </List>
    </nav>
  );
}

export default ListFollow;
