import React from 'react';
import './Home.css';
import ContentBox from '../../components/ContentBox/ContentBox';

function Home() {
  const getGreeting = () => {
    const currentHour = new Date().getHours();

    if (currentHour < 12) {
      return 'Good morning';
    } else if (currentHour < 16) {
      return 'Good afternoon';
    } else {
      return 'Good evening';
    }
  };
  return (
    <div className="body-container">
      <ContentBox contentHeading={getGreeting()}></ContentBox>
    </div>
  );
}

export default Home;
