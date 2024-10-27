import React from 'react';
import './Pagination.css';

function Pagination({ totalPages, currentPage, handlePageChange }) {
  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className = "pagination-container">
      {pages.map(page => (
        <button 
          key={page} 
          onClick={() => handlePageChange(page)} 
          className ={ currentPage === page ? 'active' : '' }
        >
          {page}
        </button>
      ))}
    </div>
  );
}

export default Pagination;