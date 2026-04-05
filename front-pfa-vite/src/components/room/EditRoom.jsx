import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { updateRoom, getRoomById } from "../utils/ApiFunctions";

const EditRoom = () => {

    const[room, setRoom] = useState({
            photo:null,
            roomType:"",
            roomPrice:""

        })

         const [_successMessage, _setSuccessMessage] = useState("")
         const [_errorMessage, _setErrorMessage] = useState("")
         const [_imagePreview, _setImagePreview] = useState("")
         const {roomId: _roomId} = useParams()

       
        const _handleImageChange =(e) => {
        const selectedImage = e.target.files[0] 
        setRoom({ ...room, photo: selectedImage }) 
        _setImagePreview(URL.createObjectURL(selectedImage)) 

    }
        const _handleRoomInputChange = (event) => {
        const { name, value } = event.target;
        setRoom({ ...room, [name]: value });
    };

       useEffect(() => {    
         const fetchRoom = async () => {
        try {
            const roomData= await getRoomById(_roomId)
            setRoom(roomData)
            _setImagePreview(roomData.photo)
        } catch (error) {
            console.error("Error fetching room details:", error);
        }
    };
    fetchRoom()
},[_roomId])

        const _handleSubmit = async (event) => {
        event.preventDefault();
            try {   
                const response = await updateRoom(_roomId, room)
                if(response.status === 200){

                    _setSuccessMessage("Room updated successfully!")
                    const updatedRoom = await getRoomById(_roomId)
                    setRoom(updatedRoom)
                    _setImagePreview(updatedRoom.photo)
                    _setErrorMessage("")
                } else {
                    _setErrorMessage("Failed to update the room. Please try again.")
                    
                }
            } catch (error) {
                console.error("Error updating room:", error);
                _setErrorMessage("An error occurred while updating the room. Please try again.")
            }
        }

     

    return (
        <div className="container mt-5 mb-5">
            <h3 className="text-center mb-5 mt-5">Edit Room</h3>
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    {_successMessage && (
                        <div className="alert alert-success" role="alert">
                            {_successMessage}
                            </div>
                    )}
                    {_errorMessage && (
                        <div className="alert alert-danger " role="alert">
                            {_errorMessage}
                            </div>
                    )}
                    <form onSubmit={_handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="roomType" className="form-label hotel -color ">
                                Room Type
                                </label>
                            <input

                                type="text"
                                className="form-control"
                                id="roomType"
                                name="roomType"
                                value={room.roomType}
                                onChange={_handleRoomInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="roomPrice" className="form-label hotel-color">
                                Room Price
                                </label>
                            <input
                                type="number"
                                className="form-control"
                                id="roomPrice"
                                name="roomPrice"
                                value={room.roomPrice}
                                onChange={_handleRoomInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="photo" className="form-label">Photo</label>
                            <input
                                type="file"
                                className="form-control"
                                id="photo"
                                name="photo"
                                onChange={_handleImageChange}
                            />
                        </div>

                        <div className="mb-3">
                                <label htmlFor="photo" className="form-label hotel-color">
                                    Photo
                                    </label>
                                <input
                                required
                                    type="file"
                                    className="form-control"
                                    id="photo"
                                    name="photo"
                                    onChange={_handleImageChange}
                                />
                                {_imagePreview && (
                                    <img
                                        src={
                                            _imagePreview.startsWith('blob:') || _imagePreview.startsWith('data:')
                                                ? _imagePreview
                                                : `data:image/jpeg;base64,${_imagePreview}`
                                        }
                                        alt="Room Preview"
                                        className=" mt-3"
                                        style={{ maxWidth: "400px", maxHeight: "400" }}
                                    />
                                )}
                            </div>
                            <div className="d-grid gap-2d-md-flex mt-2">
                                <Link to={'/existing-room'} className="btn btn-outline-info ml-5">
                                Back
                                </Link>
                                <button type="submit" className="btn btn-outline-warning">
                                   Edit Room
                                </button>
                            </div>
                       
                         </form>
                     </div>
                 </div>
             </div>
    )
}
export default EditRoom;