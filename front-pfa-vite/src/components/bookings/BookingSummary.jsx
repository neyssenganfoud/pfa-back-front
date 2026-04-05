import moment from "moment";
import { useState } from "react";
import { Button } from "react-bootstrap";

const BookingSummary = ({ booking, payment, isFormValid, onConfirm }) => {
    const numberOfDays = moment(booking.checkOutDate).diff(
        moment(booking.checkInDate),
        "days"
    );
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);

    const handleConfirmBooking = async () => {
        setIsProcessingPayment(true);
        try {
            await onConfirm();
        } finally {
            setIsProcessingPayment(false);
        }
    };

    return (
        <div className="card card-body mt-5">
            <h4>Reservation Summary</h4>
            <p>
                Full name:
                <strong>{booking.guestFullName}</strong>
            </p>
            <p>
                Email: <strong> {booking.guestEmail}</strong>
            </p>
            <p>
                Check-in Date:
                <strong>
                    {moment(booking.checkInDate).format("MMM  Do YYYY")}
                </strong>
            </p>
            <p>
                Check-out Date:{" "}
                <strong>
                    {moment(booking.checkOutDate).format("MMM Do YYYY")}
                </strong>
            </p>
            <p>
                Number of Days : <strong>{numberOfDays}</strong>
            </p>
            <p>
                Number of Adults: <strong>{booking.numberOfAdults}</strong>
            </p>
            <p>
                Number of Children: <strong>{booking.numberOfChildren}</strong>
            </p>

            <div>
                <h5>Number of Guests</h5>
                <strong>
                    Adult{parseInt(booking.numberOfAdults, 10) > 1 ? "s" : ""}{" "}
                    : {booking.numberOfAdults}{" "}
                </strong>
                <strong>Children : {booking.numberOfChildren}</strong>
            </div>
            {payment > 0 ? (
                <>
                    <p>
                        Total Payment: <strong>${payment.toFixed(2)}</strong>
                    </p>
                    <Button
                        variant="success"
                        onClick={handleConfirmBooking}
                        disabled={isProcessingPayment}
                    >
                        {isProcessingPayment ? (
                            <>
                                <span
                                    className="spinner-border spinner-border-sm me-2"
                                    role="status"
                                    aria-hidden="true"
                                ></span>
                                Envoi de la réservation…
                            </>
                        ) : (
                            "Confirm Booking and Proceed to Payment"
                        )}
                    </Button>
                </>
            ) : (
                <p className="text-danger">
                    Check-out date must be after check-in date (or invalid
                    dates).
                </p>
            )}
        </div>
    );
};
export default BookingSummary;
