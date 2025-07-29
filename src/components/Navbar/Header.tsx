import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Image from "next/image";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

const pages = [
  {
    id: "home",
    name: "Home",
    path: "/",
  },
  {
    id: "pokemon-type",
    name: "Pokemon Type",
    path: "/pokemon-type",
  },
];

function Header() {
  const  { t } = useTranslation();
  const router = useRouter();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleNavigate = (page: { id: string; name: string; path: string }) => {
    router.push(page?.path);
    handleCloseNavMenu();
  };

  return (
    <AppBar position="static" color="transparent" sx={{ boxShadow: "none" }}>
      <div className="backdrop-blur-md">
        <Container className="h-[5.866rem] flex items-center">
          <Toolbar disableGutters className="flex gap-10">
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
                sx={{ display: { xs: "block", md: "none" } }}
              >
                {pages.map((page) => (
                  <MenuItem key={page?.id} onClick={() => handleNavigate(page)}>
                    <Typography sx={{ textAlign: "center" }}>
                      {page?.name}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Image src="/assets/logo.png" alt="logo" height={59} width={167} />
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page?.id}
                  color={router?.pathname == page?.path ? "primary" : "inherit"}
                  onClick={() => handleNavigate(page)}
                  sx={{ display: "block", textTransform: "none", borderRadius: 0, borderBottom: router?.pathname == page?.path ? "1px solid var(--color-primary)" : "none", '&:hover': {borderBottom: "1px solid var(--color-primary)", color: "var(--color-primary)", backgroundColor: "transparent"} }}
                >
                  {t(page?.name)}
                </Button>
              ))}
            </Box>
          </Toolbar>
        </Container>
      </div>
    </AppBar>
  );
}
export default Header;
