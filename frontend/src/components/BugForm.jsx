import React, { useState } from 'react';
import './BugForm.css';

const BugForm = ({ onBugCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();

    if (!title) {
      alert('Title is required');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/bugs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description }),
      });

      const data = await res.json();
      if (res.ok) {
        onBugCreated(data);
        setTitle('');
        setDescription('');
      } else {
        alert(data.message || 'Failed to submit bug');
      }
    } catch (error) {
      console.error('Error submitting bug:', error);
      alert('An error occurred');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bug-form">
      <h2>Report a New Bug</h2>
      <input
        placeholder="Bug title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Bug description"
        value={description}
        onChange={e => setDescription(e.target.value)}
        rows={4}
      />
      <button type="submit">Submit Bug</button>
    </form>
  );
};

export default BugForm;


