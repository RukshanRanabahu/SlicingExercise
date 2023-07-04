import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import styles from './index.module.css';

export default function ContactCard(props: {
  picture: { large: string };
  email: string;
  name: { first: String; last: String; title: String };
  location: {state: string; postcode: string; street: {name : string; number: number}};
  cell: string;
}) {
  const theme = useTheme();

  return (
    <Card sx={{ display: "flex" }}>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={props.picture.large}
        alt="Live from space album cover"
      />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography style={{ fontWeight: 'bold'}} component="div" variant="subtitle1">
            {props.name.first + " " + props.name.last}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            component="div"
          >
            {props.email}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            component="div"
          >
           {props.cell}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            component="div"
          >
            {props.location.street.number+" "+props.location.street.name+" "+props.location.state}
          </Typography>
        </CardContent>
        <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}></Box>
      </Box>
    </Card>
  );
}
