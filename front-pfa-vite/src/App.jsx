import React from "react"
//import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
//import "/node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
import AddRoom from "./components/room/AddRoom";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import ExistingRooms from "./components/room/ExistingRooms";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EditRoom from "./components/room/EditRoom";
import NavBar from "./components/layout/NavBar";
import Footer from "./components/layout/Footer";
import Home from "./components/home/Home";
import RoomListing from "./components/room/RoomListing";
import Admin from "./components/admin/Admin";
import BookingSuccess from "./components/bookings/BookingSuccess";
import BookingForm from "./components/bookings/BookingForm";
import Login from "./components/auth/Login";
import Logout from "./components/auth/Logout";
function App() {
 

  return (

    <>
    <main>
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/edit-room/:roomId" element={<EditRoom />} />
        <Route path="/existing-rooms" element={<ExistingRooms />} />
        <Route path="/add-room" element={<AddRoom />} />
        <Route path="/book-room/:roomId" element={<BookingForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/browse-all-rooms" element={<RoomListing />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/booking-success" element={<BookingSuccess/>} />
      </Routes>
    </Router>
    <Footer />
    </main>
     
    </>
  )
}

export default App
