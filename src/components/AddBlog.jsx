import React, { useState } from "react";
import { Box, Typography, InputLabel, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const labelStyles = {
  marginBottom: 2,
  marginTop: 2,
  fontSize: "24px",
  fontWeight: "bold",
};
const AddBlog = () => {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({ title: "", desc: "", imageURL: "" });
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const sendReq=async()=>{
    const res=await axios.post("http://localhost:4000/api/blog/add",{
      title:inputs.title,
      description:inputs.desc,
      image:inputs.imageURL,
      user:localStorage.getItem("userId")
    })
    const data=await res.data;
    console.log(data);
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendReq()
      .then((data) => console.log(data))
      .then(() => navigate("/blogs"));;
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          border={3}
          borderRadius={10}
          boxShadow="10px 10px 20px #ccc"
          borderColor="#1876d1"
          padding={3}
          margin={"auto"}
          marginTop={3}
          display="flex"
          flexDirection={"column"}
          width={"80%"}
          backgroundColor="white"
        >
          <Typography
            fontWeight={"bold"}
            padding={3}
            variant="h2"
            textAlign={"center"}
          >
            Write your Blog to post
          </Typography>
          <InputLabel sx={labelStyles}>Title</InputLabel>
          <TextField
            name="title"
            onChange={handleChange}
            value={inputs.title}
            margin="normal"
            variant="outlined"
          />
          <InputLabel sx={labelStyles}>Description</InputLabel>
          <TextField
            name="desc"
            onChange={handleChange}
            value={inputs.desc}
            margin="normal"
            variant="outlined"
          />
          <InputLabel sx={labelStyles}>Image URL</InputLabel>
          <TextField
            name="imageURL"
            onChange={handleChange}
            value={inputs.imageURL}
            margin="normal"
            variant="outlined"
          />
          <Button
            sx={{ marginTop: 2, borderRadius: 4, fontSize: 20 }}
            variant="contained"
            color="warning"
            type="submit"
          >
            Publish
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default AddBlog;
