import { useEffect, useState } from 'react';

const useFeedback = (currentStatus) => {
  const [feedbackActive, setFeedbackActive] = useState(false);

  useEffect(() => {
    if (currentStatus === 'loading') {
      setFeedbackActive(true);
    }
    if (currentStatus === 'succeeded' || currentStatus === 'failed') {
      setTimeout(() => {
        setFeedbackActive(false);
      }, 800);
    }
  }, [currentStatus]);

  return feedbackActive;
};

export default useFeedback;
