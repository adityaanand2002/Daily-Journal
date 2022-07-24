import axios from 'axios';
import React from 'react'
import {useParams} from 'react-router-dom'
import {useEffect} from 'react'
import {useState} from 'react'
import {Box,Typography,InputLabel,TextField,Button} from '@mui/material';
import {useNavigate} from 'react-router-dom'


const labelStyles = {
  marginBottom: 2,
  marginTop: 2,
  fontSize: "24px",
  fontWeight: "bold",
};

const BlogDetail = () => {
  const navigate = useNavigate();
  const [blog,setBlog]=useState();
  const id=useParams().id;
  console.log(id);

  const [inputs, setInputs] = useState();

      const handleChange = (e) => {
        setInputs((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }));
      };

  const fetchDetails=async()=>{
    const res=await axios.get(`http://localhost:4000/api/blog/${id}`);
    const data=await res.data;
    return data;
  }

  useEffect(() => {
    fetchDetails().then((data) => {
      setBlog(data)
      setInputs({title: data.title, description: data.description})
    });
  },[id]); 

  const sendReq=async()=>{
    const res = await axios.put(`http://localhost:4000/api/blog/update/${id}`,{
      title:inputs.title,
      description:inputs.description,
    });
    const data = await res.data;
    return data;
  }
  const handleSubmit = (e)=>{
    e.preventDefault();
    console.log(inputs);
    sendReq().then((data) => {console.log(data)}).then(()=>navigate("/myBlogs"));
  }

  return (
    <div>
    {inputs &&
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
            name="description"
            onChange={handleChange}
            value={inputs.description}
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
      </form>}
    </div>
  );
}

export default BlogDetail