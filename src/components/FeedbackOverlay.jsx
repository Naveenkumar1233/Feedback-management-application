import React from 'react';

const FeedbackOverlay = ({ feedback, response, setResponse, onSubmitResponse, onClose }) => {
  if (!feedback) return null;

  return (
    <div className="overlay">
      <div className="overlay-content">
        <h2>Feedback Details</h2>
        <p><strong>Name:</strong> {feedback.name}</p>
        <p><strong>Body:</strong> {feedback.body}</p>
        <textarea
          placeholder="Your response"
          value={response}
          onChange={(e) => setResponse(e.target.value)}
        />
        <div className="button-group">
          <button onClick={() => onSubmitResponse('Acknowledge')}>Acknowledge</button>
          <button onClick={() => onSubmitResponse('Address')}>Address</button>
          <button onClick={() => onSubmitResponse('Ignore')}>Ignore</button>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackOverlay;
