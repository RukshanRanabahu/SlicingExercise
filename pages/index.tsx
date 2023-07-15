import React, { useState, useEffect } from "react";
import ContactCard from "@/compnents/card_component";
import AppBarDrawer from "@/compnents/appbar_drawer";
import { Grid, Typography } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export default function Home(props: { contactsData: any }) {
  let { contactsData } = props;
  const [page, setPage] = React.useState(1);
  const [displayData, setDisplayData] = React.useState(contactsData.results);
  const [filteredData, setFilteredData] = React.useState([]);
  const [natData, setNatData] = React.useState<string[]>([]);
  const [filterNatData, setFilterNatData] = React.useState("");
  const [gender, setGender] = React.useState<string | number>("");
  const [pagesCount, setPagesCount] = React.useState(12);

  const handleChangeGender = (event: any) => {
    setGender(event.target.value);
  };

  const handleChangeNationality = (event: any) => {
    setFilterNatData(event.target.value);
  };

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  function commonFilter(data: any) {
    return filterNatData == ""
      ? gender == 10
        ? data.gender == "female"
        : gender == 20
        ? data.gender == "male"
        : data
      : gender == 10
      ? data.gender == "female" && data.nat == filterNatData
      : gender == 20
      ? data.gender == "male" && data.nat == filterNatData
      : data.nat == filterNatData;
  }

  function removeDuplicatesa() {
    let tempArray: string[] = [];
    tempArray = displayData.map((a: { nat: string }) => a.nat);
    let unique: any[] = [];
    tempArray.forEach((element) => {
      if (!unique.includes(element)) {
        unique.push(element);
      }
    });
    return unique;
  }

  useEffect(() => {
    setDisplayData(contactsData.results.filter(commonFilter));
  }, [gender, filterNatData]);

  useEffect(() => {
    setPagesCount(Math.ceil(displayData.length / 9));
    setNatData(removeDuplicatesa);
  }, [displayData]);

  useEffect(() => {
    setFilteredData(
      displayData.slice(page == 0 ? 0 : (page - 1) * 9, 9 * page)
    );
  }, [displayData, page]);

  return (
    <Box>
      <AppBarDrawer></AppBarDrawer>
      <Box style={{ paddingLeft: "20px", paddingRight: "20px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h1"
              style={{
                fontSize: "40px",
              }}
            >
              My <span style={{ fontWeight: "bold" }}> Contacts </span>
            </Typography>
          </Grid>
          <Grid
            style={{ borderBottom: "solid 2px #000" }}
            item
            xs={0}
            sm={6}
            md={9}
          ></Grid>
        </Grid>
        <Box
          sx={{
            paddingBottom: "10px",
            paddingTop: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <FormControl style={{ minWidth: "200px", paddingRight: "20px" }}>
            <InputLabel id="select-gender-label">gender</InputLabel>
            <Select
              labelId="select-gender-label"
              id="select-gender"
              value={gender}
              label="gender"
              onChange={handleChangeGender}
            >
              <MenuItem value={""}>Select Gender</MenuItem>
              <MenuItem value={10}>Female</MenuItem>
              <MenuItem value={20}>Male</MenuItem>
            </Select>
          </FormControl>
          <FormControl style={{ minWidth: "200px" }}>
            <InputLabel id="select-nationality-label">nationality</InputLabel>
            <Select
              labelId="select-nationality-label"
              id="select-nationality"
              value={filterNatData}
              label="nationality"
              onChange={handleChangeNationality}
            >
              <MenuItem value={""}>Select Nationality</MenuItem>
              {natData.map((e) => (
                <MenuItem key={e} value={e}>
                  {e}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Grid container spacing={2}>
          {filteredData.map(
            (post: {
              picture: { large: string };
              email: string;
              name: { first: String; last: String; title: String };
              location: {
                state: string;
                postcode: string;
                street: { name: string; number: number };
              };
              cell: string;
            }) => (
              <Grid key={post.email} item xs={12} sm={6} md={4}>
                <Box key={post.email} style={{ maxHeight: "125px", overflowY: "hidden" }}>
                  <ContactCard
                    picture={post.picture}
                    email={post.email}
                    name={post.name}
                    location={post.location}
                    cell={post.cell}
                    key={post.email}
                  />
                </Box>
              </Grid>
            )
          )}
        </Grid>
      </Box>
      <Box style={{ display: "flex", justifyContent: "center" }}>
        <Stack spacing={2}>
          <Pagination
            count={pagesCount}
            shape="rounded"
            onChange={handleChange}
          />
        </Stack>
      </Box>
    </Box>
  );
}

Home.getInitialProps = async () => {
  let contactsData = await (
    await fetch(`https://randomuser.me/api/?results=100`)
  ).json();
  return { contactsData };
};
