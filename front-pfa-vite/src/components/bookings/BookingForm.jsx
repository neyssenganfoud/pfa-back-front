import React, { useState, useEffect } from "react";
import { getRoomById, bookRoom, getApiErrorMessage } from "../utils/ApiFunctions";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { FormControl, Form } from "react-bootstrap";
import BookingSummary from "./BookingSummary";

const BookingForm = () => {
    const [isValidated, setIsValidated] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [roomPrice, setRoomPrice] = useState(0);

    const [booking, setBooking] = useState({
        guestFullName: "",
        guestEmail: "",
        checkInDate: "",
        checkOutDate: "",
        numberOfAdults: "",
        numberOfChildren: "",
    });

    const { roomId } = useParams();
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBooking({ ...booking, [name]: value });
        setErrorMessage("");
    };

    const getRoomPriceById = async (id) => {
        try {
            const response = await getRoomById(id);
            const price = response.roomPrice;
            setRoomPrice(
                typeof price === "number" ? price : parseFloat(price) || 0
            );
        } catch (error) {
            setErrorMessage(getApiErrorMessage(error));
        }
    };

    useEffect(() => {
        if (roomId) getRoomPriceById(roomId);
    }, [roomId]);

    const calculatePayement = () => {
        const checkInDate = moment(booking.checkInDate);
        const checkOutDate = moment(booking.checkOutDate);
        if (!checkInDate.isValid() || !checkOutDate.isValid()) return 0;
        const diffInDays = checkOutDate.diff(checkInDate, "days");
        const price = roomPrice ? roomPrice : 0;
        return Math.max(0, diffInDays) * price;
    };

    const isGuestCountValid = () => {
        const adultCount = parseInt(booking.numberOfAdults, 10);
        const childrenCount = parseInt(booking.numberOfChildren, 10) || 0;
        const totalCount = adultCount + childrenCount;
        return totalCount >= 1 && adultCount >= 1;
    };

    const isCheckOutDateValid = () => {
        if (
            !moment(booking.checkOutDate).isSameOrAfter(
                moment(booking.checkInDate)
            )
        ) {
            setErrorMessage(
                "La date de départ doit être le même jour ou après la date d'arrivée."
            );
            return false;
        }
        setErrorMessage("");
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        if (
            form.checkValidity() === false ||
            !isGuestCountValid() ||
            !isCheckOutDateValid()
        ) {
            e.stopPropagation();
        } else {
            setIsSubmitted(true);
        }
        setIsValidated(true);
    };

    const handleBooking = async () => {
        try {
            const confirmationCode = await bookRoom(roomId, booking);
            navigate("/booking-success", {
                state: {
                    message: `Réservation confirmée. Code : ${confirmationCode}`,
                },
            });
        } catch (error) {
            const msg = getApiErrorMessage(error);
            setErrorMessage(msg);
        }
    };

    return (
        <>
            <div className="container mb-5">
                <div className="row">
                    <div className="col-md-6">
                        <div className="card card-body mt-5">
                            <h4 className="card card-title"> Reserve Room </h4>
                            <Form
                                noValidate
                                validated={isValidated}
                                onSubmit={handleSubmit}
                            >
                                <Form.Group>
                                    <Form.Label htmlFor="guestFullName">
                                        Full Name:
                                    </Form.Label>

                                    <FormControl
                                        required
                                        type="text"
                                        id="guestFullName"
                                        name="guestFullName"
                                        value={booking.guestFullName}
                                        placeholder="Enter your fullname"
                                        onChange={handleInputChange}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter your full name.
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group>
                                    <Form.Label htmlFor="guestEmail">
                                        Email:
                                    </Form.Label>

                                    <FormControl
                                        required
                                        type="email"
                                        id="guestEmail"
                                        name="guestEmail"
                                        value={booking.guestEmail}
                                        placeholder="Enter your email"
                                        onChange={handleInputChange}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter a valid email address.
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <fieldset style={{ border: "2px" }}>
                                    <legend>Stay period</legend>
                                    <div className="row">
                                        <div className="col-6">
                                            <Form.Label htmlFor="checkInDate">
                                                Check-in Date:
                                            </Form.Label>

                                            <FormControl
                                                required
                                                type="date"
                                                id="checkInDate"
                                                name="checkInDate"
                                                value={booking.checkInDate}
                                                placeholder="Enter check-in date"
                                                onChange={handleInputChange}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Please select a valid check-in date.
                                            </Form.Control.Feedback>
                                        </div>

                                        <div className="col-6">
                                            <Form.Label htmlFor="checkOutDate">
                                                Check-out Date:
                                            </Form.Label>

                                            <FormControl
                                                required
                                                type="date"
                                                id="checkOutDate"
                                                name="checkOutDate"
                                                value={booking.checkOutDate}
                                                placeholder="Enter check-out date"
                                                onChange={handleInputChange}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Please select a valid check-out date.
                                            </Form.Control.Feedback>
                                        </div>

                                        {errorMessage && (
                                            <p className="text-danger mt-2">
                                                {errorMessage}
                                            </p>
                                        )}
                                    </div>
                                </fieldset>

                                <fieldset>
                                    <legend>Number of Guest</legend>
                                    <div className="row">
                                        <div className="col-6">
                                            <Form.Label htmlFor="numberOfAdults">
                                                Number of Adults:
                                            </Form.Label>

                                            <FormControl
                                                required
                                                type="number"
                                                id="numberOfAdults"
                                                name="numberOfAdults"
                                                value={booking.numberOfAdults}
                                                placeholder="0"
                                                min={1}
                                                onChange={handleInputChange}
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                Please select at least 1 adult.
                                            </Form.Control.Feedback>
                                        </div>

                                        <div className="col-6">
                                            <Form.Label htmlFor="numberOfChildren">
                                                Number of Children:
                                            </Form.Label>

                                            <FormControl
                                                required
                                                type="number"
                                                id="numberOfChildren"
                                                name="numberOfChildren"
                                                value={booking.numberOfChildren}
                                                placeholder="0"
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                </fieldset>

                                <div className="form-group mt-2 mb-2">
                                    <button type="submit" className="btn btn-hotel">
                                        Continue
                                    </button>
                                </div>
                            </Form>
                        </div>
                    </div>

                    <div className="col-md-6">
                        {isSubmitted && (
                            <BookingSummary
                                booking={booking}
                                payment={calculatePayement()}
                                onConfirm={handleBooking}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};
export default BookingForm;
