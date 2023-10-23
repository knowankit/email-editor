import * as React from "react";
import { styled, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import QuizIcon from "@mui/icons-material/Quiz";
import LogoutIcon from "@mui/icons-material/Logout";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import NextLink from "next/link";
import useSidebarStore from "@/store/sidebar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { logoutUser } from "@/api/user";
import { useRouter } from "next/router";
import FormatShapesIcon from "@mui/icons-material/FormatShapes";

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: "hidden"
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`
  }
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: prop => prop !== "open"
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme)
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme)
  })
}));

export default function Sidebar({ children }: { children: React.ReactNode }) {
  const { isSidebarOpen, setSidebarStatus } = useSidebarStore();
  const router = useRouter();

  const handleDrawer = () => {
    setSidebarStatus(!isSidebarOpen);
  };

  const menuItems = [
    {
      name: "Profile",
      icon: <AccountCircleIcon />,
      path: "/profile",
      isActive: router.pathname === "/profile"
    },
    {
      name: "Surveys",
      icon: <QuizIcon />,
      path: "/surveys",
      isActive: router.pathname === "/surveys"
    },
    {
      name: "Response",
      icon: <AnalyticsIcon />,
      path: "/response",
      isActive: router.pathname === "/response"
    },
    {
      name: "Email editor",
      icon: <FormatShapesIcon />,
      path: "/email-editor",
      isActive: router.pathname === "/email-editor"
    }
  ];

  const handleLogout = async () => {
    const response = await logoutUser();

    if (response.status === 200) {
      localStorage.removeItem("token");
      router.push("/login");
    }
  };

  const defaultMenuStyle = {
    display: "block",
    margin: isSidebarOpen ? "0.8rem" : "0.2rem",
    "&:not(.active)": {
      "&:hover": {
        backgroundColor: "transparent",
        width: "90%",
        borderRadius: "1rem"
      }
    }
  };

  const activeMenuStyle = {
    backgroundColor: "#5BE584",
    width: "90%",
    borderRadius: "1rem"
  };

  const itemStyle = {
    color: "black"
  };

  const getEmailElementWidth = () => {
    if (router.pathname === "/email-editor") {
      if (isSidebarOpen) return "calc(100vw - (300px + 240px))";
      return "calc(100vw - 370px)";
    }

    return "calc(100vw - 240px)";
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer variant="permanent" open={isSidebarOpen}>
        <DrawerHeader>
          <IconButton onClick={handleDrawer} sx={{ color: "black" }}>
            {isSidebarOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <Box height={"calc(100vh - 128px)"}>
          <List>
            {menuItems.map(item => (
              <ListItem
                key={item.name}
                className={router.pathname === item.path ? "active" : ""}
                disablePadding
                sx={
                  item.isActive
                    ? { ...defaultMenuStyle, ...activeMenuStyle }
                    : { ...defaultMenuStyle }
                }
              >
                <NextLink href={item.path} style={{ textDecoration: "none" }}>
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: isSidebarOpen ? "initial" : "center",
                      px: 2.5,
                      ...itemStyle
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: isSidebarOpen ? 3 : "auto",
                        justifyContent: "center",
                        color: "black"
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>

                    <ListItemText
                      primary={item.name}
                      sx={{
                        opacity: isSidebarOpen ? 1 : 0
                      }}
                    />
                  </ListItemButton>
                </NextLink>
              </ListItem>
            ))}
          </List>
        </Box>
        <List>
          <ListItem disablePadding sx={{ display: "block" }}>
            <ListItemButton
              onClick={() => handleLogout()}
              sx={{
                minHeight: 48,
                justifyContent: isSidebarOpen ? "initial" : "center",
                px: 2.5
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: isSidebarOpen ? 3 : "auto",
                  justifyContent: "center"
                }}
              ></ListItemIcon>
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: isSidebarOpen ? 3 : "auto",
                  justifyContent: "center"
                }}
              >
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText
                primary={"Logout"}
                sx={{ opacity: isSidebarOpen ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Box
        height="100vh"
        width={getEmailElementWidth()}
        component="main"
        padding={4}
      >
        {children}
      </Box>
    </Box>
  );
}
