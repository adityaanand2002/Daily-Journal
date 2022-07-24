import React from 'react'
import {Card,CardMedia,CardContent,Typography,Box,IconButton} from '@mui/material'
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

const Blog = (props) => {
    const navigate=useNavigate();
    const  handleEdit=()=>{
        navigate(`/myBlogs/${props.id}`);
    }
    const deletereq=async()=>{
      const res=await axios.delete(`http://localhost:4000/api/blog/${props.id}`);
      const data=await res.data;
      return data;
    }
    const handleDel=()=>{
         deletereq().then((data)=>{console.log(data)});
    }
  return (
    <div>
      <Card
        sx={{
          width: "60%",
          margin: "auto",
          marginTop: 2,
          padding: 2,
          boxShadow: "5px 5px 10px #ccc",
          ":hover": {
            boxShadow: "10px 10px 20px #ccc ",
          },
        }}
      >
        <CardMedia
          component="img"
          height="140"
          image={props.img}
          alt="Image not found"
        />
        <CardContent>
          <Typography gutterBottom variant="h3" component="div">
            {props.title}
          </Typography>
          <Typography variant="body" color="text.secondary">
            {props.des}
          </Typography>
          <Typography sx={{fontSize:15, marginTop:2}}>By- {props.user}</Typography>
          {props.isUser && <Box sx={{float:'right'}} fontSize="40">
            <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }} size="large">
              <EditIcon/>
            </IconButton>
            <IconButton onClick={handleDel} sx={{ marginLeft: "auto" }} size="large">
              <DeleteIcon/>
            </IconButton>
          </Box>}
        </CardContent>
      </Card>
    </div>
  );
}

export default Blog;