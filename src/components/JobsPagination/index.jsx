import React from 'react';
import './JobsPagination.css';

const JobsPagination = ({ pagination, onPageChange, loading = false }) => {
  if (!pagination || pagination.last_page <= 1) {
    return null;
  }

  const { current_page, last_page, total } = pagination;

  return (
    <nav className='jobs-pagination' aria-label='Job list pagination'>
      <button
        type='button'
        className='jobs-pagination__btn'
        disabled={loading || current_page <= 1}
        onClick={() => onPageChange(current_page - 1)}
      >
        Previous
      </button>
      <span className='jobs-pagination__info'>
        Page {current_page} of {last_page} ({total} jobs)
      </span>
      <button
        type='button'
        className='jobs-pagination__btn'
        disabled={loading || current_page >= last_page}
        onClick={() => onPageChange(current_page + 1)}
      >
        Next
      </button>
    </nav>
  );
};

export default JobsPagination;
