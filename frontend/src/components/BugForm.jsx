import React, { useState } from 'react';
import './BugForm.css';

const BugForm = ({ onBugCreated }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!title) {
      alert('Title is required');
      return;
    }

    try {
      const response = await fetch('https://week-6-test-debug-assignment-andiswacyria.onrender.com/api/bugs', {
        method: 'POST',
        body: JSON.stringify({ title, description }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        console.error('Server responded with error:', response.status, response.statusText);
        try {
          const errorData = await response.json();
          console.error('Error details:', errorData);
          alert(errorData.message || 'Failed to submit bug');
        } catch (parseError) {
          console.error('Could not parse error response:', parseError);
          alert('Something went wrong');
        }
        return;
      }

      const responseText = await response.text();

      if (responseText) {
        try {
          const data = JSON.parse(responseText);
          console.log('Bug submitted successfully:', data);
          onBugCreated(data);
          setTitle('');
          setDescription('');
        } catch (parseError) {
          console.error('Received non-empty, but non-JSON response:', responseText);
          alert('Bug submitted but response was not in expected format');
        }
      } else {
        // Empty response – still consider success
        console.log('Received empty response. Assuming success.');
        alert('Bug submitted successfully.');
        setTitle('');
        setDescription('');
      }

    } catch (error) {
      console.error('Error submitting bug:', error);
      alert('Network or server error occurred');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bug-form">
      <h2>Report a New Bug</h2>
      <input
        placeholder="Bug title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Bug description"
        value={description}
        onChange={e => setDescription(e.target.value)}
        rows={4}
      />
      <button type="submit">Submit Bug</button>
      {error && <p className="error-message">{error}</p>}
    </form>
  );
};

export default BugForm;



