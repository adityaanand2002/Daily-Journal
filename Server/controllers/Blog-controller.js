import mongoose from 'mongoose';
import Blog from "../model/Blog";
import User from "../model/User";

export const getAllBlogs = async (req, res, next) => {
  let Blogs;
  try {
    Blogs = await Blog.find().populate("user");
  } catch (e) {
    return console.log(e);
  }

  if (!Blogs) {
    return res.status(404).json({ message: "No blogs found" });
  }
  return res.status(200).json({ blogs: Blogs });
};

export const addBlog = async (req, res, next) => {
  const { title, description, image, user } = req.body;

  let exist;
  try{
    exist =await User.findById(user);
  }catch(e){
    return console.log(e);
  }

  if(!exist) {
    return res.status(400).json({ message: "User not found" });
  }

  const blog = new Blog({
    title: title,
    description: description,
    image: image,
    user: user,
  });
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await blog.save({session:session});
    exist.blogs.push(blog);
    await exist.save({session: session});
    await session.commitTransaction();
  } catch (e) {
    return console.log(e);
  }
  return res.status(200).json({ blog });
};

export const updateBlog = async(req, res) => {
  const { title, description } = req.body;
  const BlogID = req.params.id;
  let blog;
  try {
    blog = await Blog.findByIdAndUpdate(BlogID, {
      title: title,
      description: description,
    });
  } catch (e) {
    return console.log(e);
  }

  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }
  return res.status(200).json({ blog });
};

export const getById = async (req, res, next) => {
  const id = req.params.id;
  let blog;
  try {
    blog = await Blog.findById(id);
  } catch (e) {
    return console.log(e);
  }
  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }
  return res.status(200).json({ blog });
};

export const deleteBlog = async(req, res) => {
  const id = req.params.id;
  let blog;
  try {
    blog = await Blog.findByIdAndRemove(id).populate("user");
    await blog.user.blogs.pull(blog);
    await blog.user.save();
  } catch (e) {
    return console.log(e);
  }
  if (!blog) {
    return res.status(404).json({ message: "Blog not found" });
  }
  return res.status(200).json({ message: "Blog deleted successfully" });
};

export const getByUserId= async (req, res, next) => {
    const userId= req.params.id;
    let userblogs;
    try{
        userblogs=await User.findById(userId).populate("blogs");
    }catch (e) {
        return console.log(e);
    }

    if(!userblogs){
        return res.status(404).json({message:"User not found"});
    }
    return res.status(200).json({user:userblogs});
}