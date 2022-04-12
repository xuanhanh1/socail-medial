import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { db } from "../firebase";
import { toast } from "react-toastify";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Card, ListItemText, ListItem, Divider, Button } from "@mui/material";
import Input from "@mui/material/Input";
import { makeStyles } from "@mui/styles";
import HomeTwoToneIcon from "@mui/icons-material/HomeTwoTone";
import IconButton from "@mui/material/IconButton";
import ApartmentSharpIcon from "@mui/icons-material/ApartmentSharp";
import WorkIcon from "@mui/icons-material/Work";
import SchoolIcon from "@mui/icons-material/School";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";

import "./Profile.scss";
const useStyles = makeStyles({
  editProfileBtn: {
    position: "absolute !important",
    right: "130px",
    bottom: 0,
    marginBottom: "10px !important",
  },
  editProfileForm: {
    paddingBottom: "40px",
  },
});
const ariaLabel = { "aria-label": "description" };
export default function LabTabs(props) {
  const [value, setValue] = React.useState("1");
  const [allInput, setAllInput] = useState({
    address: "",
    school: "",
    work: "",
    hobby: "",
  });
  const user = useSelector((state) => state.userInfor);
  const classes = useStyles();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleOnChangeInput = (event) => {
    setAllInput({ ...allInput, [event.target.name]: event.target.value });
  };

  const updateProfile = () => {
    console.log("all input ", allInput);
    var users = db.collection("users").doc(user.uid);

    return users
      .update({
        aboutMe: allInput,
      })
      .then(() => {
        console.log("Document successfully updated!");

        toast.success("follow thành công ");
        setAllInput({ address: "", school: "", work: "", hobby: "" });
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      });
  };
  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <div className="edit-profile-header">
        <h3>Giới Thiệu</h3>
      </div>
      <Card
        elevation={4}
        className={classes.homePost}
        sx={{
          ml: 2,
          mr: 2,
          alignItems: "center",
          mb: 5,
          position: "relative",
        }}
      >
        <TabContext value={value}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              marginBottom: "30px",
            }}
          >
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Tổng quan " value="1" />
              <Tab label="Hồ sơ" value="2" />
            </TabList>
          </Box>
          <TabPanel value="1">
            <Box
              component="form"
              sx={{
                "& > :not(style)": {
                  marginTop: 1,
                  width: "90%",
                },
              }}
              noValidate
              autoComplete="off"
              className={classes.editProfileForm}
            >
              <div className="form">
                <ListItem>
                  <IconButton aria-label="delete">
                    <HomeTwoToneIcon />
                  </IconButton>
                  <ListItemText primary="Địa chỉ" />
                </ListItem>
                <Input
                  placeholder="Phú Hòa, Phú Yên"
                  name="address"
                  value={allInput.address}
                  id="address"
                  inputProps={ariaLabel}
                  onChange={handleOnChangeInput}
                  sx={{
                    marginTop: 0,
                    paddingLeft: 1,
                    marginLeft: "40px",
                    width: "90%",
                  }}
                />
              </div>
              <Divider />
              <div className="form">
                <ListItem>
                  <IconButton aria-label="delete">
                    <SchoolIcon />
                  </IconButton>
                  <ListItemText primary="Học vấn" />
                </ListItem>
                <Input
                  placeholder="Trường THPT Trần Quốc Tuấn"
                  name="school"
                  value={allInput.school}
                  id="school"
                  onChange={handleOnChangeInput}
                  inputProps={ariaLabel}
                  sx={{
                    marginTop: 0,
                    paddingLeft: 1,
                    marginLeft: "40px",
                    width: "90%",
                  }}
                />
              </div>
              <Divider />
              <div className="form">
                <ListItem>
                  <IconButton aria-label="delete">
                    <WorkIcon />
                  </IconButton>
                  <ListItemText primary="Công việc" />
                </ListItem>
                <Input
                  placeholder="133 Tân Cảng"
                  name="work"
                  value={allInput.work}
                  id="work"
                  onChange={handleOnChangeInput}
                  inputProps={ariaLabel}
                  sx={{
                    marginTop: 0,
                    paddingLeft: 1,
                    marginLeft: "40px",
                    width: "90%",
                  }}
                />
              </div>
              <Divider />
              <div className="form">
                <ListItem>
                  <IconButton aria-label="delete">
                    <SportsEsportsIcon />
                  </IconButton>
                  <ListItemText primary="Sở Thích" />
                </ListItem>
                <Input
                  placeholder="Chơi game"
                  name="hobby"
                  value={allInput.hobby}
                  id="hobby"
                  onChange={handleOnChangeInput}
                  inputProps={ariaLabel}
                  sx={{
                    marginTop: 0,
                    paddingLeft: 1,
                    marginLeft: "40px",
                    width: "90%",
                  }}
                />
              </div>
              <Divider />
            </Box>
            <Button
              variant="contained"
              color="primary"
              className={classes.editProfileBtn}
              onClick={updateProfile}
            >
              save
            </Button>
          </TabPanel>
          <TabPanel value="2"></TabPanel>
        </TabContext>
      </Card>
    </Box>
  );
}
