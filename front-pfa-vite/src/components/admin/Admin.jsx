import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../layout/NavBar';
import Room from '../room/Room';
const Admin = () => {
    return (
        <section className="container mt-5">
            <h2> Welcome to the Admin Panel </h2>
            <hr />
            <Link to ={"/add-room"} >
            Manage Rooms
            </Link>
            <Room />
        </section>
    )
}

export default Admin;
