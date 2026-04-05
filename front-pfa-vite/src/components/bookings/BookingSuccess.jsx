import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../common/Header";

const BookingSuccess = () => {
    const location = useLocation();
    const error = location.state?.error;
    const message =
        location.state?.message ??
        "Booking successful! Thank you for choosing our hotel.";

    return (
        <div className="container">
            <Header title="Booking Success" />
            <div className="mt-5">
                {error ? (
                    <div>
                        <h3 className="text-danger">Booking Failed</h3>
                        <p className="text-danger">{error}</p>
                    </div>
                ) : (
                    <div>
                        <h3 className="text-success">Booking Success!</h3>
                        <p className="text-success">{message}</p>
                    </div>
                )}
            </div>
        </div>
    );
};
export default BookingSuccess;
