import React from 'react';
import NavBar from '../layout/NavBar';
import { Container } from 'react-bootstrap';

const Parallax = () => {
    return (
        <div className="parallax mb-5">
            <Container className="text-center px-5 py-5 justify-content-center ">
                <div className='animated-texts bouceIn'>
                    <h1>
                    welcome to <span className='hotel-color'>SmartHotelPlus</span>
                    </h1>

                   <h3>We offer the best sevices for all your needs</h3>
                </div>
            </Container>

         </div>
    )
}
export default Parallax;    