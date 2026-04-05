package com.Pfa.projectPfa_hotel.util;

import com.Pfa.projectPfa_hotel.model.Room;
import com.Pfa.projectPfa_hotel.response.RoomResponse;

import java.sql.Blob;
import java.sql.SQLException;

public final class RoomMapper {

    private RoomMapper() {
    }

    public static byte[] blobToBytes(Blob blob) {
        if (blob == null) {
            return null;
        }
        try {
            return blob.getBytes(1, (int) blob.length());
        } catch (SQLException e) {
            throw new IllegalStateException("Erreur lecture photo", e);
        }
    }

    public static RoomResponse toResponse(Room room) {
        if (room == null) {
            return null;
        }
        byte[] photoBytes = blobToBytes(room.getPhoto());
        return new RoomResponse(
                room.getId(),
                room.getRoomType(),
                room.getRoomPrice(),
                room.isBooked(),
                photoBytes,
                null
        );
    }
}
