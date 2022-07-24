import React, { useState, useEffect } from "react";
import axios from "axios";
import Blog from "./Blog";

const UserBlogs = () => {
  const [user, setUser] = useState([]);
  const id = localStorage.getItem("userId");

  const sendRequest = async () => {
    const res = await axios.get("http://localhost:4000/api/blog/user/" + id);
    const data = await res.data;
    console.log(data);
    return data;
  };

  useEffect(() => {
    sendRequest().then((data) => setUser(data.user));
  }, []);
  return (
    <div>
      {user &&
        user.blogs &&
        user.blogs.map((blog, idx) => (
          <Blog
            id={blog._id}
            key={idx}
            isUser={true}
            title={blog.title}
            des={blog.description}
            img={blog.image}
            user={blog.user.name}
          />
        ))}
      {!user.blogs && (
        <h1 align="center">
          No Blogs to display! Go to Compose to write a blog
        </h1>
      )}
    </div>
  );
};

export default UserBlogs;
