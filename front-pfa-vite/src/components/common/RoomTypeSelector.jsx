
import React, { useEffect, useState } from "react"
import { getRoomTypes } from "../utils/ApiFunctions";   
const RoomTypeSelector = ({handleRoomInputChange,newRoom}) => {
    const [roomTypes, setRoomTypes] = useState([""])
    const [showNewRoomTypeInput, setShowNewRoomTypesInput] =useState(false)   
    const [newRoomType, setNewRoomType] =useState("")  
    
    
    useEffect(() => {
        getRoomTypes().then((data) =>{
            setRoomTypes(data)

       

    }
        )
    }, [])


    const handleNewRoomTypeChange = (e) => {
         setNewRoomType(e.target.value)
    }

    const handleAddNewRoomType = () => {
        if (newRoomType !== "") {
            setRoomTypes([...roomTypes, newRoomType])
            setNewRoomType("")
            setShowNewRoomTypesInput(false)
        }
    }

    return (
        <>

        {roomTypes.length > 0 && (
            <div>
                <select
                id='roomType'
                className="form-select"
                 name="roomType" 
                 value={newRoom.roomType} 
                 onChange={(e) =>{
                    if (e.target.value === "Add New"){
                        setShowNewRoomTypesInput(true)

                    }else{
                        handleRoomInputChange(e)
                    }
                 }}>
                    <option value={""}>Select Room Type</option>
                    <option value={"Add New"}>Add New Room Type</option>
                    {roomTypes.map((type, index) => (
                    <option key ={index} value={typeof type === "string" ? type : (type?.roomType ?? "")}>
                        {typeof type === "string" ? type : (type?.roomType ?? "")}
                        </option>
                        ))}

                 </select>
                 {showNewRoomTypeInput && (
                    <div className="input-group mt-2"> 
                        <input type="text" 
                        className="form-control" 
                        placeholder=" Enter a New Room Type" 
                        value={newRoomType}
                         onChange={handleNewRoomTypeChange}
                          />
                        <button className="btn btn-hotel" type="button" onClick={handleAddNewRoomType}>
                            Add
                        </button>
            </div>
                    )}
            </div>
        )}


        </>
    )
}
export default RoomTypeSelector