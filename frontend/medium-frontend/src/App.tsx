import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Signin } from "./pages/SignIn"
import { Signup } from "./pages/SignUp"
import {  Blogs } from "./pages/Blogs"
import { Appbar } from "./components/Appbar"
import { Blog } from "./pages/Blog"
import { CreateBlog } from "./pages/CreateBlog"

 
 

function App() {
  

  return (
    <>
       <BrowserRouter>
       
        <Appbar/>
       <Routes>
        <Route path="/signin" element={<Signin/>}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/blog/:id" element={<Blog/>}></Route>
        <Route path="/createblog" element={<CreateBlog/>}></Route>
        <Route path="/blogs" element={<Blogs/>}></Route>
       </Routes>
       </BrowserRouter>
    </>
  )
}

export default App
