import React, { useState } from "react";
import {
  AppBar,
  Tabs,
  Tab,
  Typography,
  Toolbar,
  Box,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { authActions } from "../store";

const Header = () => {
  const dispath = useDispatch();
  const isLoggedIn = useSelector((State) => State.isLoggedIn);
  const [value, setValue] = useState();
  return (
    <AppBar sx={{}} position="sticky">
      <Toolbar>
        <Typography variant="h3">DAILY JOURNAL</Typography>
        {isLoggedIn && (
          <Box display="flex" marginLeft="auto">
            <Tabs
              textColor="inherit"
              value={value}
              onChange={(e, val) => setValue(val)}
            >
              <Tab
                sx={{ fontSize: 15 }}
                LinkComponent={Link}
                to="/blogs"
                label="All Blogs"
              />
              <Tab
                sx={{ fontSize: 15 }}
                LinkComponent={Link}
                to="/myBlogs"
                label="My Blogs"
              />
            </Tabs>
            <Button
              variant="contained"
              LinkComponent={Link} 
              to="/blogs/add"
              sx={{
                margin: 1,
                fontSize: 15,
                borderRadius: 10,
                border: "1px solid #ccc",
                float: "right",
              }}
            >
              Add Blog
            </Button>
          </Box>
        )}
        <Box display="flex" marginLeft="auto">
          {!isLoggedIn && (
            <>
              <Button
                LinkComponent={Link}
                to="/auth"
                variant="contained"
                color="warning"
                sx={{ margin: 1, fontSize: 15, borderRadius: 10 }}
              >
                Login / Signup
              </Button>
            </>
          )}
          {isLoggedIn && (
            <Button
              onClick={() => dispath(authActions.logout())}
              LinkComponent={Link}
              to="/"
              variant="contained"
              color="warning"
              sx={{ margin: 1, fontSize: 15, borderRadius: 10 }}
            >
              Logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
