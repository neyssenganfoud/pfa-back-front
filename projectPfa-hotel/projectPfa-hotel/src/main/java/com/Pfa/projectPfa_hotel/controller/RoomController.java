package com.Pfa.projectPfa_hotel.controller;

import com.Pfa.projectPfa_hotel.model.Room;
import com.Pfa.projectPfa_hotel.response.RoomResponse;
import com.Pfa.projectPfa_hotel.service.IRoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.math.BigDecimal;
import java.sql.SQLException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/rooms")

public class RoomController {

private final IRoomService roomService;

@PostMapping("/add/new-room")
public ResponseEntity<RoomResponse> addNewRoom(
        @RequestParam("photo") MultipartFile photo ,
        @RequestParam("roomType") String roomType,
        @RequestParam("roomPrice") BigDecimal roomPrice) throws SQLException, IOException
      {

        Room savedRoom = roomService.addNewRoom(photo, roomType, roomPrice);
        RoomResponse response = new RoomResponse(savedRoom.getId(), savedRoom.getRoomType(), savedRoom.getRoomPrice());
        return ResponseEntity.status(201).body(response);
    }

    @GetMapping("/room-types")
    public List<String> getRoomTypes(){
    return  roomService.getAllRoomTypes();
    }

}
