import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FeedbackList from './components/FeedbackList';
import Filters from './components/Filters';


import './App.css';
import FeedbackOverlay from './components/FeedbackOverlay';

const App = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [response, setResponse] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [responseStatusFilter, setResponseStatusFilter] = useState('');

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/comments?_limit=20')
      .then(res => {
        const feedbackData = res.data.map(fb => ({
          id: fb.id,
          name: fb.name,
          body: fb.body,
          createdAt: new Date().toISOString(),
          responseStatus: ''
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
    
    setFeedbacks(feedbacks.map(fb => 
      fb.id === selectedFeedback.id 
        ? { ...fb, responseStatus: status, response: response } // Update response here
        : fb
    ));
    
    setSelectedFeedback(null);
    setResponse('');
  };
  
  const handleFeedbackClick = (feedback) => {
    setSelectedFeedback(feedback);
  };
  
  const applyFilters = () => {
    let filtered = feedbacks;
    if (filterDate) {
      filtered = filtered.filter(fb => new Date(fb.createdAt).toISOString().slice(0, 10) === filterDate);
    }
    if (responseStatusFilter) {
      filtered = filtered.filter(fb => fb.responseStatus === responseStatusFilter);
    }
    setFilteredFeedbacks(filtered);
  };

  return (
    <div className="App">
      <h1>Customer Feedback</h1>
      <Filters
        setFilterDate={setFilterDate}
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

      <FeedbackOverlay/>
    
    </div>
  );
};

export default App;



