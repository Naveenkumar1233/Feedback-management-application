import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FeedbackList from './components/FeedbackList';
import Filters from './components/Filters';
import FeedbackOverlay from './components/FeedbackOverlay';

import './App.css';

const App = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [response, setResponse] = useState('');
  const [filterDates, setFilterDates] = useState({ start: '', end: '' });
  const [responseStatusFilter, setResponseStatusFilter] = useState('');

  // Function to randomly assign a status
  const getRandomStatus = () => {
    const statuses = ["Acknowledge", "Address", "Ignore"];
    return statuses[Math.floor(Math.random() * statuses.length)];
  };

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/comments?_limit=20')
      .then(res => {
        const feedbackData = res.data.map(fb => ({
          id: fb.id,
          name: fb.name,
          body: fb.body,
          createdAt: new Date().toISOString(),  // Set current time as the creation time
          responseStatus: getRandomStatus(),    // Assign random response status
          response: ''  // Initialize response text as empty
        }));
        setFeedbacks(feedbackData);
        setFilteredFeedbacks(feedbackData);
      })
      .catch(err => {
        console.error("Error fetching feedback:", err);
      });
  }, []);

  const handleResponseSubmit = (status) => {
    if (response === '') {
      alert('Response cannot be empty');
      return;
    }

    // Update the feedback with the response and move it to the top of the list
    const updatedFeedbacks = feedbacks.map(fb => 
      fb.id === selectedFeedback.id
        ? { ...fb, responseStatus: status, response: response, createdAt: new Date().toISOString() } // Update time and status
        : fb
    );

    // Sort feedbacks by `createdAt` to move the modified feedback to the top
    const sortedFeedbacks = updatedFeedbacks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    setFeedbacks(sortedFeedbacks);
    setFilteredFeedbacks(sortedFeedbacks);
    
    // Reset the overlay
    setSelectedFeedback(null);
    setResponse('');
  };

  const handleFeedbackClick = (feedback) => {
    setSelectedFeedback(feedback);
  };

  const applyFilters = () => {
    let filtered = feedbacks;

    // Filter by date range
    if (filterDates.start && filterDates.end) {
      const startDate = new Date(filterDates.start);
      const endDate = new Date(filterDates.end);
      filtered = filtered.filter(fb => {
        const feedbackDate = new Date(fb.createdAt);
        return feedbackDate >= startDate && feedbackDate <= endDate;
      });
    }

    // Filter by response status
    if (responseStatusFilter) {
      filtered = filtered.filter(fb => fb.responseStatus === responseStatusFilter);
    }

    setFilteredFeedbacks(filtered);
  };

  return (
    <div className="App">
      <h1>Customer Feedback</h1>
      <Filters
        setFilterDate={(dates) => setFilterDates(dates)}
        setResponseStatusFilter={setResponseStatusFilter}
        applyFilters={applyFilters}
      />
      <FeedbackList feedbacks={filteredFeedbacks} onFeedbackClick={handleFeedbackClick} />

      {selectedFeedback && (
        <FeedbackOverlay
          feedback={selectedFeedback}
          response={response}
          setResponse={setResponse}
          onSubmitResponse={handleResponseSubmit}
          onClose={() => setSelectedFeedback(null)}
        />
      )}
    </div>
  );
};

export default App;
