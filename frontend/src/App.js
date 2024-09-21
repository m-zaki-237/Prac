import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import Navbar from "./components/Navbar";
import { Toaster } from 'react-hot-toast';
import Items from "./components/items";
import CreateItem from "./components/CreateItem";
import EditItem from "./components/EditItem";

function App() {
  return (
   <>
   <Navbar/>
   <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/signup" element={<Signup/>}/>
    <Route path="/items" element={<Items/>}/>
    <Route path="/create-item" element={<CreateItem/>}/>
    <Route path="/edit-item/:id" element={<EditItem/>}/>
   </Routes>
   <Toaster/>
   </>
  );
}

export default App;
