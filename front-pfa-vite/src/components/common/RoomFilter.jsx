import React, { useMemo, useState } from "react"

const RoomFilter = ({ data = [], onFilterChange }) => {
    const [filter, setFilter] = useState("")

    const roomTypes = useMemo(
        () => [...new Set((data ?? []).map((room) => room.roomType).filter(Boolean))],
        [data]
    )

    const handleSelectChange = (e) => {
        const selectedRoomType = e.target.value
        setFilter(selectedRoomType)
        onFilterChange?.(selectedRoomType)
    }

    const clearFilter = () => {
        setFilter("")
        onFilterChange?.("")
    }

    return (
        <div className="input-group mb-3">
            <span className="input-group-text" id="room-type-filter">
                Filter Rooms by type
            </span>
            <select className="form-select" value={filter} onChange={handleSelectChange}>
                <option value={""}>Select a room type to filter...</option>
                {roomTypes.map((type, index) => (
                    <option key={index} value={String(type)}>
                        {String(type)}
                    </option>
                ))}
            </select>

            <button className="btn btn-hotel" type="button" onClick={clearFilter}>
                Clear Filter
            </button>
        </div>
    )

}

export default RoomFilter;
