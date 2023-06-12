import React from 'react';
import emptyStateImg from '../../image/undraw_empty_re_opql.svg';
// import emptyStateImg from '../../image/erk695fjx3f5a9x7.svg';
import './emptyState.css';

function EmptyState({ value }) {
  return (
    <div className="empty-state">
      <span className="empty-state-text">
        {localStorage.getItem('token') ? value : 
          'You need to be logged in to access this part of the application'}
      </span>
      <img src={emptyStateImg} alt="empty-state-img" />
    </div>
  );
}

export default EmptyState;