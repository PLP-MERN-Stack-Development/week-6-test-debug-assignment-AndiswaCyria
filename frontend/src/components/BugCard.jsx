import React from 'react';
import './BugCard.css'; // optional, or use global CSS

function BugCard({ bug, onStatusChange, onDelete }) {
  return (
    <div className={`bug-card ${bug.status}`}>
      <h3>{bug.title}</h3>
      <p>{bug.description}</p>
      <span className={`status-badge ${bug.status}`}>{bug.status}</span>

      <div style={{ marginTop: '1rem' }}>
        <select
          value={bug.status}
          onChange={(e) => onStatusChange(bug._id, e.target.value)}
        >
          <option value="open">Open</option>
          <option value="in-progress">In Progress</option>
          <option value="resolved">Resolved</option>
        </select>

        <button
          onClick={() => onDelete(bug._id)}
          style={{ marginLeft: '1rem', backgroundColor: 'red', color: 'white' }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default BugCard;
