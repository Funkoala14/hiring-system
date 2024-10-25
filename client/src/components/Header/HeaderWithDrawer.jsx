import { useState } from "react";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Link } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import { blueGrey } from "@mui/material/colors";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import Groups3Icon from "@mui/icons-material/Groups3";

const drawerWidth = 280;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      },
    },
  ],
}));

export default function HeaderWithDrawer({
  children,
  auth,
  employeePaths,
  hrPaths,
  handleLogout,
}) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const employeeLinks = [
    {
      text: "My Profile",
      icon: <Groups3Icon />,
      path: employeePaths.profile,
    },
    {
      text: "Visa Status Management",
      icon: <TravelExploreIcon />,
      path: employeePaths.visaStatus,
    },
    {
      text: "Housing",
      icon: <MapsHomeWorkIcon />,
      path: employeePaths.housing,
    },
  ];

  const hrLinks = [
    {
      text: "Employees Management",
      icon: <Groups3Icon />,
      path: hrPaths.profile,
    },
    {
      text: "Visa Status Management",
      icon: <TravelExploreIcon />,
      path: hrPaths.visaStatus,
    },
    {
      text: "Hiring Management",
      icon: <AssignmentIndIcon />,
      path: hrPaths.hiring,
    },
    {
      text: "Housing Management",
      icon: <MapsHomeWorkIcon />,
      path: hrPaths.housing,
    },
  ];
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = () => {
    handleLogout();
    handleMenuClose();
  };

  const renderUserActions = (
    <Box sx={{ display: "flex" }}>
      <IconButton
        size="large"
        edge="end"
        aria-label="account of current user"
        aria-controls="user-menu"
        aria-haspopup="true"
        onClick={handleProfileMenuOpen}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        id="user-menu"
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={isMenuOpen}
        onClose={handleMenuClose}
        slotProps={{
          paper: {
            elevation: 2,
          },
        }}
      >
        <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
      </Menu>
    </Box>
  );

  const renderNavLinks = (links) => (
    <List>
      {links.map(({ text, icon, path }) => (
        <ListItem key={text} disablePadding sx={{ display: "block" }}>
          <ListItemButton
            component="a"
            href={path}
            sx={[
              {
                minHeight: 48,
                px: 2.5,
              },
              open
                ? {
                    justifyContent: "initial",
                  }
                : {
                    justifyContent: "center",
                  },
            ]}
          >
            <ListItemIcon
              sx={[
                {
                  minWidth: 0,
                  justifyContent: "center",
                },
                open
                  ? {
                      mr: 3,
                    }
                  : {
                      mr: "auto",
                    },
              ]}
            >
              {icon}
            </ListItemIcon>
            <ListItemText
              primary={text}
              sx={[
                open
                  ? {
                      opacity: 1,
                    }
                  : {
                      opacity: 0,
                    },
              ]}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );

  const renderLoginOrSignup = (
    <Box sx={{ display: "flex" }}>
      <Link
        href="/login"
        color="inherit"
        sx={{ textDecoration: "none", marginRight: 2 }}
      >
        Login
      </Link>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        sx={{
          backgroundColor: blueGrey[500],
          boxShadow: 0,
          borderBottom: "1px solid gray",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                marginRight: 5,
              },
              open && { display: "none" },
            ]}
          >
            <MenuIcon />
          </IconButton>
          <Link
            underline="none"
            href={auth.role === "Employee" ? employeePaths.home : hrPaths.home}
            sx={{ color: "white", display: "flex", alignItems: "center" }}
          >
            OnTrack HR
          </Link>
          <Box sx={{ flexGrow: 1 }} />
          {auth.isLoggedIn ? renderUserActions : renderLoginOrSignup}
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        {auth.role === "Employee"
          ? renderNavLinks(employeeLinks)
          : renderNavLinks(hrLinks)}
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 4,
          backgroundColor: blueGrey[50],
          pt: 12,
          height: "fit-content",
          minHeight: "100vh",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
