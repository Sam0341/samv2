import { useState, useEffect } from 'react';
import styles from '../styles/home.module.css';  // Correct import path for the CSS file

export default function Home() {
  const [message, setMessage] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [noClickCount, setNoClickCount] = useState(0); // Track the number of "No" clicks

  const handleClick = async (button) => {
    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ button }),
      });

      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await res.json();
      setMessage(data.message);

      if (button === 'Yes') {
        setShowConfirmation(true);
      }
    } catch (error) {
      console.error('Error sending email:', error);
      setMessage('Something went wrong. Please try again later.');
    }
  };

  const handleNoClick = () => {
    if (noClickCount < 3) {
      // Increment the count of "No" clicks
      setNoClickCount(noClickCount + 1);
    } else {
      // Send email with "No" after the third click
      handleClick('No');
    }
  };

  return (
    <div>
      {!showConfirmation ? (
        <div className={styles.container}>
          <div className={styles.question}>
            <h1>Wesley, will you be my girlfriend again?</h1>
          </div>
          <div className={styles.gif}>
            {/* First GIF shown initially */}
            <div className={styles.gifimg}></div>
          </div>
          <div className={styles.answerBox}>
            <button id="yes" className={styles.answer} onClick={() => handleClick('Yes')}>
              Yes!!!
            </button>
            <button id="no" className={styles.answer} onClick={handleNoClick}>
              No
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.confirmation}>
          <h1>Yayyyyyyyy!!! Finally, you're my babe again, I love you!</h1>
          {/* Second GIF shown after "Yes" */}
          <img 
            src="https://media1.tenor.com/m/2VprHA868S8AAAAC/yummy-desserts-desserts-milk-mocha.gif" 
            alt="Yay Gif" 
            className={styles.fixGifImg} 
          />
        </div>
      )}

      {message && <p>{message}</p>} {/* Display the message received from the backend */}
    </div>
  );
}
