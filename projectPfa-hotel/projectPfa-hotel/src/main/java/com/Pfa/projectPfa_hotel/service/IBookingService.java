package com.Pfa.projectPfa_hotel.service;

import com.Pfa.projectPfa_hotel.dto.BookingRequest;
import com.Pfa.projectPfa_hotel.model.BookedRoom;

import java.time.LocalDate;
import java.util.List;

public interface IBookingService {
    List<BookedRoom> getAllBookings();

    List<BookedRoom> getAllBookingsByRoomId(Long roomId);

    String saveBooking(Long roomId, BookingRequest bookingRequest);

    void cancelBooking(Long bookingId);

    BookedRoom findByBookingConfirmationCode(String confirmationCode);

    boolean isRoomAvailableForDates(Long roomId, LocalDate checkIn, LocalDate checkOut);
}
