import * as React from "react";
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
  },
});
const ariaLabel = { "aria-label": "description" };
export default function LabTabs() {
  const [value, setValue] = React.useState("1");
  const classes = useStyles();
  const handleChange = (event, newValue) => {
    setValue(newValue);
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
                    <SchoolIcon />
                  </IconButton>
                  <ListItemText primary="Học vấn" />
                </ListItem>
                <Input
                  placeholder="Trường THPT Trần Quốc Tuấn"
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
