import React from 'react';
import './Homepage.css';
const Homepage = ({ onStart }) => {
  return (
    <div className='homepage-container'>
      <h2 className='logo'>CodeWithAK</h2>
      <p className='text'>WELCOME TO QUIZ WORLD!</p>
      <div className='homepage'>
        <h2>Click Start Button To Check Your MERN Stack Leaning!</h2>
        <button onClick={onStart}>Start Quiz</button>
      </div>
    </div>
  )
}

export default Homepage
