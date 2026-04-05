package com.Pfa.projectPfa_hotel.service;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import com.Pfa.projectPfa_hotel.model.Room;

public interface IRoomService {
    Room addNewRoom(MultipartFile photo, String roomType, BigDecimal roomPrice);

    List<String> getAllRoomTypes();

    List<Room> getAllRooms();

    byte[] getRoomPhotoByRoomId(Long roomId);

    void deleteRoom(Long roomID);

    Room updateRoom(Long roomId, String roomType, BigDecimal roomPrice, byte[] photoBytes);

    Room getRoomById(Long roomId);

    Page<Room> searchRooms(String roomType, BigDecimal minPrice, BigDecimal maxPrice, Pageable pageable);
}
