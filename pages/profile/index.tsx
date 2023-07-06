/* eslint-disable @next/next/no-img-element */
import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import AppBarDrawer from "@/compnents/appbar_drawer";
import styles from "./index.module.css";
import { Grid } from "@mui/material";
import ProfilImg from '../../src/images/profile.png';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function Profile() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div>
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
            <Grid xs={0} sm={6} md={3}></Grid>
            <Grid item xs={12} sm={6} md={2}>
              <h1
                style={{
                  fontSize: "30px",
                }}
              >
                My <span style={{ fontWeight: "bold" }}> Profile </span>
              </h1>
            </Grid>
            <Grid
              style={{ width: "10px", borderBottom: "solid 2px #000" }}
              item
              xs={0}
              sm={0}
              md={4}
            ></Grid>
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
            <Tabs
              orientation="vertical"
              variant="scrollable"
              value={value}
              onChange={handleChange}
              aria-label="Vertical tabs example"
              sx={{ borderRight: 0, borderColor: "divider" }}
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
              <Grid container spacing={2} style={{ marginBottom: "15px" }}>
                <Grid xs={12} sm={6} md={3}>
                  <img src={ProfilImg} alt="Profile Image"/>
                </Grid>
                <Grid xs={12} sm={6} md={9}></Grid>
              </Grid>
            </TabPanel>
            <TabPanel value={value} index={1}>
              Item Two
            </TabPanel>
            <TabPanel value={value} index={2}>
              Item Three
            </TabPanel>
            <TabPanel value={value} index={3}>
              Item Four
            </TabPanel>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
}
