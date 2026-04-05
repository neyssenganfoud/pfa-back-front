package com.Pfa.projectPfa_hotel.service;

import java.io.IOException;
import java.math.BigDecimal;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

import javax.sql.rowset.serial.SerialBlob;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.Pfa.projectPfa_hotel.exception.InternalServiceException;
import com.Pfa.projectPfa_hotel.exception.RessourceNotFoundException;
import com.Pfa.projectPfa_hotel.model.Room;
import com.Pfa.projectPfa_hotel.repository.RoomRepository;
import com.Pfa.projectPfa_hotel.specification.RoomSpecification;

import lombok.RequiredArgsConstructor;


@Service
@RequiredArgsConstructor
public class RoomService implements IRoomService {
    private final RoomRepository roomRepository;
    @Override
    public Room addNewRoom(MultipartFile file, String roomType, BigDecimal roomPrice) {
        try {
            Room room = new Room();
            room.setRoomType(roomType);
            room.setRoomPrice(roomPrice);

            if (file != null && !file.isEmpty()) {
                byte[] photoBytes = file.getBytes();
                if (photoBytes.length > 0) {
                    try {
                        Blob photoBlob = new SerialBlob(photoBytes);
                        room.setPhoto(photoBlob);
                    } catch (javax.sql.rowset.serial.SerialException e) {
                        throw new RuntimeException("Error creating photo blob: " + e.getMessage(), e);
                    } catch (java.sql.SQLException e) {
                        throw new RuntimeException("Error creating photo blob: " + e.getMessage(), e);
                    }
                }
            }

            return roomRepository.save(room);

        } catch (IOException e) {
            throw new RuntimeException("Error reading photo file: " + e.getMessage(), e);
        } catch (RuntimeException e) {
            throw new RuntimeException("Error saving room: " + e.getMessage(), e);
        }
    }

    @Override
    public List<String> getAllRoomTypes() {
        return roomRepository.findDistinctRoomTypes();
    }

    @Override
    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    @Override
    public byte[] getRoomPhotoByRoomId(Long roomId) {
        Optional<Room> theRoom = roomRepository.findById(roomId);
        if (theRoom.isEmpty())  {
            throw new RessourceNotFoundException("Sorry,Room not found !");
        }
        Blob photoBlob = theRoom.get().getPhoto();
        if (photoBlob != null) {
            try {
                return photoBlob.getBytes(1, (int) photoBlob.length());
            } catch (SQLException e) {
                throw new RuntimeException("Error retrieving photo bytes", e);
            }
        }
        return null;
    }

    @Override
    public void deleteRoom(Long roomID) {
        Optional<Room> theRoom = roomRepository.findById(roomID);
        if (theRoom.isPresent()) {
            roomRepository.deleteById(roomID);
        } else {
            throw new RessourceNotFoundException("Sorry, Room not found!");
        }
    }

    @Override
    public Room getRoomById(Long roomId) {
        return roomRepository.findById(roomId)
                .orElseThrow(() -> new RessourceNotFoundException("Sorry,Room not found !"));
    }

    @Override
    public Page<Room> searchRooms(String roomType, BigDecimal minPrice, BigDecimal maxPrice, Pageable pageable) {
        Specification<Room> spec = RoomSpecification.combined(roomType, minPrice, maxPrice);
        return roomRepository.findAll(spec, pageable);
    }

    @Override
    public Room updateRoom(Long roomId, String roomType, BigDecimal roomPrice, byte[] photoBytes) {
        Room room = roomRepository.findById(roomId)
                .orElseThrow(() -> new RessourceNotFoundException("Sorry, Room not found!"));
        if (roomType != null) room.setRoomType(roomType);
        if (roomPrice != null) room.setRoomPrice(roomPrice);
        if (photoBytes != null && photoBytes.length > 0) {
            try {
                room.setPhoto(new SerialBlob(photoBytes));
            } catch (SQLException e) {
                throw new InternalServiceException("Error updating room");
            }
        }
        return roomRepository.save(room);
    }
}