import React, { useEffect, useState } from "react";
import Blog from "./Blog";
import axios from "axios";

const Blogs = () => {
  const [blogs, setBlogs] = useState();

  const sendRequest = async () => {
    const res = await axios.get("http://localhost:4000/api/blog");
    const data = await res.data;
    return data;
  };

  useEffect(() => {
    sendRequest().then((data) => setBlogs(data.blogs));
  }, []);
   console.log(blogs);
  return (
    <div>
      {blogs &&
        blogs.map((blog, idx) => (
          <div>
          <Blog
            id={blog._id}
            key={idx}
            isUser={localStorage.getItem("userId") === blog.user._id}
            title={blog.title}
            des={blog.description}
            img={blog.image}
            user={blog.user.name}
          />
          </div>
        ))}
      {!blogs && (
        <h1 align="center">
          No Blogs to display! Go to Compose to write a blog
        </h1>
      )}
    </div>
  );
};

export default Blogs;
