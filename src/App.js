import Header from './components/Header';
import {React} from 'react';
import {Routes, Route} from 'react-router-dom';
import Auth from "./components/Auth";
import Blogs from './components/Blogs';
import BlogDetail from './components/BlogDetail';
import About from './components/About';
import AddBlog from './components/AddBlog';
import UserBlogs from './components/UserBlogs';
import Home from './components/Home';
import { useSelector } from 'react-redux';



function App() {
  const isLoggedIn = useSelector(State => State.isLoggedIn);
  return (
    <div >
      <Header />
      <main >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/myBlogs/:id" element={<BlogDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/blogs/add" element={<AddBlog />} />
          <Route path="/myBlogs" element={<UserBlogs />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
