import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../store";
import axios from "axios";

const Auth = () => {
  const navigate = useNavigate();
  const dispath = useDispatch(); //to change redux state
  const [inputs, setInputs] = useState({ name: "", email: "", password: "" });
  const [isSignup, setIsSignup] = useState(false);
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const sendRequest = async (type = "login") => {
    const res = await axios
      .post(`http://localhost:4000/api/user/${type}`, {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
      })
      .catch((e) => console.log(e));

    const data = await res.data;
	console.log(data);
    return data;
  };

  const handleSubmit = (e) => {
    e.preventDefault(); //Prevent default action of browser
    console.log(inputs);
    if (isSignup) {
      sendRequest("signup")
        .then((data) => localStorage.setItem("userId", data.user._id))					//Storing userId in localStorage
        .then(() => dispath(authActions.login()))
        .then(() => navigate("/blogs"));
    } else {
      sendRequest()
        .then((data) => localStorage.setItem("userId", data.user._id))
        .then(() => dispath(authActions.login()))
        .then(() => navigate("/blogs"));
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          display="flex"
          flexDirection={"column"}
          alignItems="center"
          justifyContent={"center"}
          boxShadow="10px 10px 20px #ccc "
          padding={3}
          margin="auto"
          marginTop={5}
          borderRadius={5}
          maxWidth={500}
		  backgroundColor="white"
        >
          <Typography variant="h2" padding={3} textAlign="center">
            {isSignup ? "Signup" : "Login"}
          </Typography>
          {isSignup && (
            <TextField
              name="name"
              onChange={handleChange}
              placeholder="Name"
              value={inputs.name}
              margin="normal"
            />
          )}
          <TextField
            name="email"
            onChange={handleChange}
            placeholder="email"
            value={inputs.email}
            type={"email"}
            margin="normal"
          />
          <TextField
            name="password"
            onChange={handleChange}
            placeholder="password"
            value={inputs.password}
            type={"password"}
            margin="normal"
          />
          <Button
            variant="contained"
            sx={{
              borderRadius: 3,
              fontSize: 20,
              marginTop: 3,
              backgroundColor: "#eb7907",
            }}
            color="warning"
            type="submit"
          >
            Sign IN &#x2192;
          </Button>
          <Button
            onClick={() => setIsSignup(!isSignup)}
            sx={{ borderRadius: 3, fontSize: 13 }}
          >
            {isSignup ? "Login" : "Signup"} Instead
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Auth;
