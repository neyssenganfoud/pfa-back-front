import React from 'react';
import NavBar from '../layout/NavBar';
import Room from '../room/Room';

const RoomListing = () => { 
    return (
        <section className="bg-light p-2 mb-5 mt-5 shadow">
            <NavBar />
            <Room />
        </section>
    )
}

export default RoomListing;