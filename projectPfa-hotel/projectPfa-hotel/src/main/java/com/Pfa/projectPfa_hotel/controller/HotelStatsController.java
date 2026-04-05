package com.Pfa.projectPfa_hotel.controller;

import com.Pfa.projectPfa_hotel.dto.HotelDashboardStats;
import com.Pfa.projectPfa_hotel.model.Room;
import com.Pfa.projectPfa_hotel.repository.BookingRepository;
import com.Pfa.projectPfa_hotel.repository.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;

@RestController
@RequestMapping("/api/stats")
@RequiredArgsConstructor
public class HotelStatsController {

    private final RoomRepository roomRepository;
    private final BookingRepository bookingRepository;

    @GetMapping("/dashboard")
    public HotelDashboardStats dashboard() {
        long totalRooms = roomRepository.count();
        long totalBookings = bookingRepository.count();
        long bookedRoomCount = roomRepository.findAll().stream().filter(Room::isBooked).count();
        BigDecimal avg = roomRepository.averageRoomPrice();
        if (avg == null) {
            avg = BigDecimal.ZERO;
        }
        return new HotelDashboardStats(totalRooms, totalBookings, bookedRoomCount, avg);
    }
}
