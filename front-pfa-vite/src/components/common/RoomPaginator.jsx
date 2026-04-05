import React from 'react';

const RoomPaginator = ({ totalPages, onPageChange, currentPage }) => {
    const pageNumber = Array.from({length : totalPages}, (_, i) => i + 1);
    return (
        <nav>
            <ul className="pagination ,justify-content-center">
            {pageNumber.map((page) => (
                <li
                 key={pageNumber}
                  className={`page-item ${currentPage === page ? 'active' : ''}`}>

                <button className="page-link" onClick={() => onPageChange(pageNumber)}>
                    {pageNumber}
                </button>
                </li>
                
            ))}
            </ul>
        </nav>
    )
}

export default RoomPaginator;