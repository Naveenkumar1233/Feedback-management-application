import React from 'react';
import FeedbackCard from './FeedbackCard';

const FeedbackList = ({ feedbacks, onFeedbackClick }) => {
  return (
    <div className="feedback-list">
      {feedbacks.map(feedback => (
        <FeedbackCard key={feedback.id} feedback={feedback} onClick={() => onFeedbackClick(feedback)} />
      ))}
    </div>
  );
};

export default FeedbackList;
