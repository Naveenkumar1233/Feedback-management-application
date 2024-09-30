import React from 'react';

const FeedbackCard = ({ feedback, onClick }) => {
  const formatDateTime = (dateString) => {
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    };
    return new Date(dateString).toLocaleString(undefined, options);
  };

  return (
    <div className="feedback-card" onClick={onClick}>
      <h4>{feedback.name}</h4>
      <p>{feedback.body}</p>
      <p><strong>Created At:</strong> {formatDateTime(feedback.createdAt)}</p>
      <p>{}</p>
      <p><strong>Response Status:</strong> {feedback.responseStatus? feedback.responseStatus : 'Not Responded'}</p>
    </div>
  );
};

export default FeedbackCard;
