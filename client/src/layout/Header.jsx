import { useState } from "react";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import BedroomParentIcon from "@mui/icons-material/BedroomParentOutlined";
import WarningIcon from "@mui/icons-material/Warning";

import CustomLink from "../components/ui/CustomLink";
import { selectUserName } from "../features/user/userSlice";

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const location = useLocation().pathname;

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const username = useSelector(selectUserName);
  let displayUsername = username;

  const pages = [
    { name: "Home", url: "/" },
    { name: "Summary", url: "/summary" }, //TODO stuff
    { name: "About", url: "/about" }, //TODO stuff
  ];

  const settings = [
    { name: "About", url: "/about" },
    {
      name: displayUsername ? "Logout" : "Login",
      url: displayUsername ? "/logout" : "/login",
    },
  ];

  if (displayUsername == null) {
    displayUsername = (
      <Tooltip title="Not logged in" sx={{ color: "yellow" }}>
        <WarningIcon />
      </Tooltip>
    );
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <BedroomParentIcon
            sx={{ display: { xs: "none", md: "flex" }, mr: 1, fontSize: 35 }}
          />
          <Typography
            variant="h4"
            noWrap
            component="h1"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <CustomLink to="/">
              <span>RMS</span>
            </CustomLink>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <CustomLink to={page.url} color="black" key={page.name}>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page.name}</Typography>
                  </MenuItem>
                </CustomLink>
              ))}
            </Menu>
          </Box>
          <BedroomParentIcon
            sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            RMS
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => {
              const isActive = page.url === location;
              return (
                <CustomLink to={page.url} key={page.name}>
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{
                      my: 2,
                      color: "white",
                      display: "block",
                      bgcolor: isActive ? "secondary.main" : "primary.main",
                    }}
                  >
                    {page.name}
                  </Button>
                </CustomLink>
              );
            })}
          </Box>

          <Box sx={{ flexGrow: 0 }}>{displayUsername}</Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Other Options">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <MoreVertIcon sx={{ fontSize: 35, color: "white" }} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <CustomLink to={setting.url} color="black" key={setting.name}>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting.name}</Typography>
                  </MenuItem>{" "}
                </CustomLink>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
