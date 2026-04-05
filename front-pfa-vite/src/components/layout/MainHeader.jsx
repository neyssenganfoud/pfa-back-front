import React from 'react';
import NavBar from './NavBar';
// import Room from '../room/Room';

const MainHeader = () => {
    return (
        <header className="header-banner">
            <div className="overlay"></div>
            <div className="animated-text overlay-content">
                <h1>welcome to <span className='hotel-color'>SmartHotelPlus</span></h1>
                <h4>Experience the Best Hospitality in Town</h4>
            </div>
        </header>
    )
}
export default MainHeader;