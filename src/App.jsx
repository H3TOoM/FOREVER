import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import Collection from "./Pages/Collection";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Cart from "./Pages/Cart";
import Login from "./Pages/Login";
import Product from "./Pages/Product";
import Footer from "./Components/Footer";
import MyProfile from "./Pages/MyProfile";
import SearchBar from "./Components/SearchBar";
import PlaceOrder from "./Pages/placeOrder";

const App = () => {
  return (
    <div className="mx-4 sm:mx-[9%]">
      <Navbar />
      <SearchBar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product/:_id" element={<Product />} />
        <Route path="/myprofile" element={<MyProfile/>}/>
        <Route path="/place-order" element={<PlaceOrder/>} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
