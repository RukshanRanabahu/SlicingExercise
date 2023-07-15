/* eslint-disable @next/next/no-img-element */
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AppBarDrawer from "@/compnents/appbar_drawer";
import styles from "./index.module.css";
import {
  Button,
  Container,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  styled,
} from "@mui/material";
import ProfilImg from "../../src/images/profile.png";
import EditIcon from "@mui/icons-material/Edit";
import Link from "next/link";
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </Box>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const personalDetails = {
  basicDetails: ["First name", "Last name", "Email address"],
  addtionalDetails: [],
};

export default function Profile() {
  const [value, setValue] = React.useState(0);
  const [edit, setEdit] = React.useState(false);
  const [sal, setSal] = React.useState("");

  const handlSaleChange = (event: SelectChangeEvent) => {
    setSal(event.target.value as string);
  };
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const Item = () => {
    return (
      <Stack spacing={2} direction="row" className={styles.mgnTop}>
        <Button variant="contained" color="primary">
          SAVE & UPDATE
        </Button>
        <Button variant="outlined" color="inherit">
          CANCEL
        </Button>
      </Stack>
    );
  };

  return (
    <Box>
      <AppBarDrawer></AppBarDrawer>
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
        }}
        style={{ padding: "20px" }}
      >
        <Grid container spacing={2}>
          <Grid container spacing={2} style={{ marginBottom: "15px" }}>
            <Grid item xs={0} sm={6} md={3}></Grid>
            <Grid item xs={12} sm={6} md={2}>
              <Typography
                variant="h1"
                style={{
                  fontSize: "30px",
                }}
              >
                My <span style={{ fontWeight: "bold" }}> Profile </span>
              </Typography>
            </Grid>
            <Grid
              style={{ width: "10px", borderBottom: "solid 2px #000" }}
              item
              xs={0}
              sm={0}
              md={3}
            ></Grid>
            <Grid item xs={0} sm={0} md={1}></Grid>
            <Grid item xs={0} sm={0} md={3}>
              <div
                onClick={() => setEdit(!edit)}
                className={styles.EditProfileBtn}
              >
                Edit Profile
                <IconButton
                  style={{ marginRight: "0px", paddingTop: "3px" }}
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                  // onClick={}
                >
                  <EditIcon className={styles.EditIconBtn} />
                </IconButton>
              </div>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={value}
              onChange={handleChange}
              aria-label="Vertical tabs example"
              // sx={{ borderRight: 0, borderColor: "divider" }}
            >
              <Tab
                style={{ color: "#000" }}
                label="Basic Details"
                {...a11yProps(0)}
                className={styles.tabComponent}
              />
              <Tab
                style={{ color: "#000" }}
                label="Additional Details"
                {...a11yProps(1)}
                className={styles.tabComponent}
              />
              <Tab
                style={{ color: "#000" }}
                label="Spouse Details"
                {...a11yProps(2)}
                className={styles.tabComponent}
              />
              <Tab
                style={{ borderBottom: "1px solid #000", color: "#000" }}
                label="Personal Preferences"
                {...a11yProps(3)}
                className={styles.tabComponent}
              />
            </Tabs>
          </Grid>

          <Grid item xs={12} sm={8} md={9}>
            <TabPanel value={value} index={0}>
              <Stack direction="row" spacing={2}>
                <img
                  src={ProfilImg.src}
                  alt=""
                  className={styles.profileImage}
                ></img>
                <Container className={styles.profileDetails}>
                  {[
                    "Salutation",
                    "First name",
                    "Last name",
                    "Email address",
                  ].map((text, index) => (
                    <>
                      <Typography
                        key={index + text}
                        variant="subtitle1"
                        lineHeight={2}
                        fontWeight={"bold"}
                      >
                        {text}*
                      </Typography>
                      {edit ? (
                        text == "Salutation" ? (
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={sal}
                            label=""
                            style={{ minWidth: "400px" }}
                            onChange={handlSaleChange}
                          >
                            <MenuItem value={10}>Mr</MenuItem>
                            <MenuItem value={20}>Miss</MenuItem>
                            <MenuItem value={30}>Mrs</MenuItem>
                          </Select>
                        ) : (
                          <TextField
                            style={{ minWidth: "400px" }}
                            id="outlined-basic"
                            label=""
                            variant="outlined"
                          />
                        )
                      ) : (
                        <Typography lineHeight={3}>--</Typography>
                      )}
                    </>
                  ))}
                  {edit ? <Item></Item> : <></>}
                </Container>
              </Stack>
            </TabPanel>
            <TabPanel value={value} index={1}>
              {[
                "Mobile number",
                "Home address",
                "Country",
                "Postal code",
                "Nationality",
                "Date of birth",
                "Gender",
                "Marital status",
              ].map((text, index) => (
                <>
                  <Typography
                    key={index + text}
                    variant="subtitle1"
                    lineHeight={2}
                    fontWeight={"bold"}
                  >
                    {text}*
                  </Typography>
                  {edit ? (
                    <TextField
                      style={{ minWidth: "400px" }}
                      id="outlined-basic"
                      label=""
                      variant="outlined"
                    />
                  ) : (
                    <Typography lineHeight={2}>--</Typography>
                  )}
                </>
              ))}
              {edit ? <Item></Item> : <></>}
            </TabPanel>
            <TabPanel value={value} index={2}>
              {["Salutation", "First name", "Last name"].map((text, index) => (
                <>
                  <Typography
                    key={index + text}
                    variant="subtitle1"
                    lineHeight={2}
                    fontWeight={"bold"}
                  >
                    {text}*
                  </Typography>
                  {edit ? (
                    <TextField
                      style={{ minWidth: "400px" }}
                      id="outlined-basic"
                      label=""
                      variant="outlined"
                    />
                  ) : (
                    <Typography lineHeight={3}>--</Typography>
                  )}
                </>
              ))}
              {edit ? <Item></Item> : <></>}
            </TabPanel>
            <TabPanel value={value} index={3}>
              {[
                "Hobbies and interests",
                `Favorite sport(s)`,
                `Preferred music genre(s)`,
                `Preferred movie/TV show(s)`,
              ].map((text, index) => (
                <>
                  <Typography
                    key={index + text}
                    variant="subtitle1"
                    lineHeight={2}
                    fontWeight={"bold"}
                  >
                    {text}*
                  </Typography>
                  {edit ? (
                    <TextField
                      style={{ minWidth: "400px" }}
                      id="outlined-basic"
                      label=""
                      variant="outlined"
                    />
                  ) : (
                    <Typography lineHeight={3}>--</Typography>
                  )}
                </>
              ))}
              {edit ? <Item></Item> : <></>}
            </TabPanel>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
