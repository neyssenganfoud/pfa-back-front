package com.Pfa.projectPfa_hotel.controller;

import com.Pfa.projectPfa_hotel.dto.BookingCreatedResponse;
import com.Pfa.projectPfa_hotel.dto.BookingRequest;
import com.Pfa.projectPfa_hotel.exception.InvalidBookingRequestException;
import com.Pfa.projectPfa_hotel.exception.RessourceNotFoundException;
import com.Pfa.projectPfa_hotel.model.BookedRoom;
import com.Pfa.projectPfa_hotel.model.Room;
import com.Pfa.projectPfa_hotel.response.BookingResponse;
import com.Pfa.projectPfa_hotel.service.IBookingService;
import com.Pfa.projectPfa_hotel.service.IRoomService;
import com.Pfa.projectPfa_hotel.util.RoomMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/bookings")
public class BookingController {

    private final IBookingService bookingService;
    private final IRoomService roomService;

    @GetMapping("/all-bookings")
    public ResponseEntity<List<BookingResponse>> getAllBookings() {
        List<BookedRoom> bookings = bookingService.getAllBookings();
        List<BookingResponse> responses = bookings.stream().map(this::getBookingResponse).toList();
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/room/{roomId}/bookings")
    public ResponseEntity<List<BookingResponse>> getBookingsForRoom(@PathVariable Long roomId) {
        List<BookedRoom> bookings = bookingService.getAllBookingsByRoomId(roomId);
        List<BookingResponse> responses = bookings.stream().map(this::getBookingResponse).toList();
        return ResponseEntity.ok(responses);
    }

    @GetMapping("/confirmation/{confirmationCode}")
    public ResponseEntity<?> getBookingByConfirmationCode(@PathVariable String confirmationCode) {
        try {
            BookedRoom booking = bookingService.findByBookingConfirmationCode(confirmationCode);
            BookingResponse bookingResponse = getBookingResponse(booking);
            return ResponseEntity.ok(bookingResponse);
        } catch (RessourceNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        }
    }

    @PostMapping(value = "/room/{roomId}/booking", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> saveBooking(@PathVariable Long roomId, @RequestBody BookingRequest bookingRequest) {
        try {
            String confirmationCode = bookingService.saveBooking(roomId, bookingRequest);
            return ResponseEntity.ok(new BookingCreatedResponse(
                    confirmationCode,
                    "Réservation enregistrée avec succès."
            ));
        } catch (InvalidBookingRequestException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @DeleteMapping("/booking/{bookingId}/delete")
    public ResponseEntity<?> cancelBooking(@PathVariable Long bookingId) {
        try {
            bookingService.cancelBooking(bookingId);
            return ResponseEntity.noContent().build();
        } catch (RessourceNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
        }
    }

    private BookingResponse getBookingResponse(BookedRoom booking) {
        Room theRoom = roomService.getRoomById(booking.getRoom().getId());
        return new BookingResponse(
                booking.getBookingId(),
                booking.getCheckInDate(),
                booking.getCheckOutDate(),
                booking.getGuestFullName(),
                booking.getGuestEmail(),
                booking.getNumOfAdults(),
                booking.getNumOfChildren(),
                booking.getTotalNumOfGuest(),
                booking.getBookingConfirmationCode(),
                RoomMapper.toResponse(theRoom)
        );
    }
}
