package com.Pfa.projectPfa_hotel.repository;

import com.Pfa.projectPfa_hotel.model.BookedRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BookingRepository extends JpaRepository<BookedRoom, Long> {

    @Query("SELECT DISTINCT b FROM BookedRoom b JOIN FETCH b.room")
    List<BookedRoom> findAllWithRoom();

    @Query("SELECT b FROM BookedRoom b JOIN FETCH b.room WHERE b.room.id = :roomId")
    List<BookedRoom> findByRoomIdWithRoom(@Param("roomId") Long roomId);

    BookedRoom findByBookingConfirmationCode(String confirmationCode);
}
