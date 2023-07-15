import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import styles from "./index.module.css";

type Anchor = "right";

const ListItemComponent = (text: any) => {
  return (
    <ListItem disablePadding>
      <ListItemButton>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary={text.text} />
      </ListItemButton>
    </ListItem>
  );
};

export default function AppBarDrawer() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const drawerList = (anchor: Anchor) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      {["My Contacts", "My Profile", "Edit Profile"].map((text, index) => (
        <>
          <List key={index}>
            {text == "My Profile" ? (
              <Link href="/profile">
                <ListItemComponent text={text} />
              </Link>
            ) : (
              <Link href="/">
                <ListItemComponent text={text} />
              </Link>
            )}
          </List>
        </>
      ))}
      <Divider />
      <List key="Logout">
        <ListItemComponent text="Logout" />
      </List>
    </Box>
  );

  return (
    <Box>
      <Box sx={{ flexGrow: 1 }}>
        <Box style={{ display: "flex", padding: "10px" }}>
          <Button
            variant="outlined"
            color="inherit"
            className={styles.customButton}
          >
            Logo
          </Button>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          ></Typography>

          <IconButton
            className={styles.customIconButton}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer("right", true)}
          >
            <MenuIcon />
          </IconButton>
        </Box>
      </Box>
      <React.Fragment>
        <Drawer
          anchor="right"
          open={state["right"]}
          onClose={toggleDrawer("right", false)}
        >
          {drawerList("right")}
        </Drawer>
      </React.Fragment>
    </Box>
  );
}
