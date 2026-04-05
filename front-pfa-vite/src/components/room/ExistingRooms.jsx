import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { deleteRoom, getAllRooms } from "../utils/ApiFunctions";
import RoomFilter from "../common/RoomFilter";
import RoomPaginator from "../common/RoomPaginator"
import { FaTrashAlt, FaPlus, FaEdit, FaEye } from "react-icons/fa"
import { Link } from "react-router-dom";

const ExistingRooms = () => {

  const [rooms, setRooms] = useState([{id: "", roomType: "", roomPrice: ""}]);
  const [currentPage, setCurrentPage] = useState(1);
  const [roomsPerPage] = useState(8);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [filteredRooms, setFilteredRooms] = useState([{id: "", roomType: "", roomPrice: ""}]);
  const [selectedRoomType, setSelectedRoomType] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    setIsLoading(true);
    try {
      const result = await getAllRooms();
      setRooms(result);
      setFilteredRooms(result);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (selectedRoomType === "") {
      setFilteredRooms(rooms);
    } else {
      const filtered = rooms.filter(
        (room) => room.roomType === selectedRoomType
      );
      setFilteredRooms(filtered);
    }
    setCurrentPage(1);
  }, [rooms, selectedRoomType]);

  const handlePaginationClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDelete = async (roomId) => {
    try {
      await deleteRoom(roomId);
      setSuccessMessage(`Room No ${roomId} deleted successfully.`);
      fetchRooms();
    } catch (error) {
      setErrorMessage(error.message);
    }
    setTimeout(() => {
      setSuccessMessage("");
      setErrorMessage("");
    }, 3000);
  };

  const calculateTotalPages = (filteredRooms, roomsPerPage, rooms) => {
    const totalRooms =
      filteredRooms.length > 0 ? filteredRooms.length : rooms.length
    return Math.ceil(totalRooms / roomsPerPage)
  };

  const indexOfLastRoom = currentPage * roomsPerPage;
  const indexOfFirstRoom = indexOfLastRoom - roomsPerPage;
  const currentRooms = filteredRooms.slice(
    indexOfFirstRoom,
    indexOfLastRoom
  );

  return (
    <>
    <div className="container col-md-6 col-lg-6">
      {successMessage && 
        <p className="alert alert-success mt-5">{successMessage}</p>}
      {errorMessage && 
        <p className="alert alert-danger mt-5">{errorMessage}</p>}
    </div>
      {isLoading ? (
        <p>Loading existing rooms...</p>
      ) : (
        <section className="mt-5 mb-5 container">
          <div className="d-flex justify-content-between mb-3 mt-5">
            <h2>Existing Rooms</h2>

          </div>
          <Row>
            <Col md={6} className="mb-3 mb-md-0">
              <RoomFilter
                data={rooms}
                onFilterChange={setSelectedRoomType}
              />
            </Col>

             <Col md={6} className="d-flex justify-content-end">
              <Link to={"/add-room"} >
              <FaPlus/> Add New Room
              </Link>
             </Col>
          </Row>

         
          
        

         

          {errorMessage && (
            <p className="text-danger text-center">{errorMessage}</p>
          )}

          {successMessage && (
            <p className="text-success text-center">{successMessage}</p>
          )}

          <table className="table table-bordered table-hover">
            <thead>
              <tr className="text-center">
                <th>ID</th>
                <th>Room Type</th>
                <th>Room Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentRooms.map((room) => (
                <tr key={room.id} className="text-center">
                  <td>{room.id}</td>
                  <td>{room.roomType}</td>
                  <td>{room.roomPrice}</td>
                  <td className="d-flex justify-content-center gap-2">
                    <Link to={`/edit-room/${room.id}`}>
                      <span className="btn btn-info btn-sm">
                        <FaEye/>
                        </span>
                        <span className="btn btn-info btn-sm">
                        <FaEdit/>
                        </span>
                    
                    </Link>
                    
                    <button className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(room.id)}>
                         <FaTrashAlt />
                     </button>  
                     
                   
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <RoomPaginator
            currentPage={currentPage}
            totalPages={calculateTotalPages(
              filteredRooms,
              roomsPerPage,
              rooms
            )}
            onPageChange={handlePaginationClick}
          />
        </section>
      )}
    </>
  );
};

export default ExistingRooms;
