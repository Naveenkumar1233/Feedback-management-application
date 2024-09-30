import React from 'react';

const FeedbackCard = ({ feedback, onClick }) => {
  return (
    <div className="feedback-card" onClick={onClick}>
      <h3>{feedback.name}</h3>
      <p>{feedback.body}</p>
      <p><strong>Status:</strong> {feedback.responseStatus || 'Not responded'}</p> {/* Display the status */}
    </div>
  );
};

export default FeedbackCard;
