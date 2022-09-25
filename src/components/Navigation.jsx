import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import FlightIcon from "@material-ui/icons/Flight";
import DirectionsCarIcon from "@material-ui/icons/DirectionsCar";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";
import CreditCardIcon from "@material-ui/icons/CreditCard";
import { BrowserRouter, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import ReactDOM from "react-dom";
import Button from "@material-ui/core/Button";
import OfflineBoltIcon from "@material-ui/icons/OfflineBolt";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
import { CardActionArea } from "@material-ui/core";
import { Box } from "@mui/material";
import { lightBlue } from "@material-ui/core/colors";
import { Stack } from "@mui/material";

import Grid from "@material-ui/core/Grid";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },

  palette: {
    primary: lightBlue,
  },
  overrides: {
    MuiButtons: {
      raisedPrimary: {
        color: "white",
      },
    },
  },

  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },

  customizeToolbar: {
    minHeight: 36,
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },

  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 2),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function MiniDrawer() {
  /*
  const classes = useStyles();
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const menuItems = [
    {
      text: "Driving",
      icon: <DirectionsCarIcon />,
      path: "/vehicle",
    },

    {
      text: "Flight",
      icon: <FlightIcon />,
      path: "/flight",
    },
    {
      text: "Electricity",
      icon: <OfflineBoltIcon />,
      path: "/electricity",
    },
    {
      text: "Donation",
      icon: <CardGiftcardIcon/>,
      path: "/donations",
    }
  ];
  */

  var color = "white"
  if (window.location.pathname !== "/home" && window.location.pathname !== "/"){
    color = "#000080"
  } else if (window.location.pathname == "/home" || window.location.pathname == "/") {
    color = "white"
  }

  return (
    <div>
      <AppBar style={{ background: "transparent" }}>
        <Toolbar
          style={{
            display: "flex",
            flexDirection: "row-reverse",
            justifyContent: "space-between"
          }}
        >
          <Button
          variant="h6"
            style={{
              color: color,
              fontSize: "18px",
              border: "1px solid",
            }}
            href="/donations"
          >
            Donate
          </Button>

          <Button
            variant="h6"
            style={{ color: color, fontSize: "18px" }}
            href="/electricity"
          >
            Electricity
          </Button>

          <Button
            variant="h6"
            style={{ color: color, fontSize: "18px" }}
            href="/flight"
          >
            Flight
          </Button>
          <Button
            variant="h6"
            style={{ color: color, fontSize: "18px" }}
            href="/vehicle"
          >
            Vehicle
          </Button>

          <Button
            variant="h6"
            style={{ color: color, fontSize: "33px" }} 
            sx={{mr: 10,}}
            href="/home"
          >
            Offset
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
