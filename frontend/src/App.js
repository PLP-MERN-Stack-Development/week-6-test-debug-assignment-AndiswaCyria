import React, { useEffect, useState } from 'react';
import BugForm from './components/BugForm';
import BugCard from './components/BugCard';
import './components/FilterBar.css';

function App() {
  const [bugs, setBugs] = useState([]);
  const [error, setError] = useState('');

  // Fetch bugs from the backend
  const fetchBugs = () => {
    fetch('http://localhost:5000/api/bugs')
      .then(res => res.json())
      .then(setBugs)
      .catch(err => setError('Failed to load bugs'));
  };

  useEffect(() => {
    fetchBugs();
  }, []);

  // Function to handle new bug creation
  const handleNewBug = bug => {
    setBugs(prev => [bug, ...prev]);
  };

   // Function to update bug status
  const updateStatus = async (id, newStatus) => {
  try {
    const res = await fetch(`http://localhost:5000/api/bugs/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    });

    const updatedBug = await res.json();

    // Update state
    setBugs(prev =>
      prev.map(bug => (bug._id === id ? updatedBug : bug))
    );
  } catch (err) {
    console.error('Failed to update bug status:', err);
    alert('Could not update bug status');
  }
};

// Function to delete a bug
const deleteBug = async (id) => {
  if (!window.confirm('Are you sure you want to delete this bug?')) return;

  try {
    const res = await fetch(`http://localhost:5000/api/bugs/${id}`, {
      method: 'DELETE',
    });

    const data = await res.json();

    if (res.ok) {
      setBugs(prev => prev.filter(bug => bug._id !== id));
    } else {
      alert(data.message || 'Failed to delete bug');
    }
  } catch (err) {
    console.error('Error deleting bug:', err);
    alert('An error occurred while deleting the bug.');
  }
};

// State for status filter
const [statusFilter, setStatusFilter] = useState('all');

// State for search term
const [searchTerm, setSearchTerm] = useState('');


  return (
    <div className="container">
      <h1>🐞 Bug Tracker</h1>
      <BugForm onBugCreated={handleNewBug} />
      {error && <p style={{ color: 'red' }}>{error}</p>}
{bugs.length === 0 ? (
  <p>No bugs reported.</p>
) : (
  <>
    <div className="filter-bar">
      <label htmlFor="statusFilter"><strong>Filter by Status:</strong></label>
      <select
        id="statusFilter"
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        
      >
        <option value="all">All</option>
        <option value="open">Open</option>
        <option value="in-progress">In Progress</option>
        <option value="resolved">Resolved</option>
      </select>


  <input
    type="text"
    placeholder="Search bugs by title or description..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
</div>


    <div className="bug-list">
  {bugs
    .filter(bug => statusFilter === 'all' || bug.status === statusFilter)
    .filter(bug =>
      bug.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (bug.description && bug.description.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .map(bug => (
      <BugCard
        key={bug._id}
        bug={bug}
        onStatusChange={updateStatus}
        onDelete={deleteBug}
      />
    ))}
</div>

  </>
)}
    </div>
  );
}

export default App;



