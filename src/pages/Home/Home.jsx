import React from 'react';
import ContentBox from '../../components/ContentBox/ContentBox';
import './Home.css';
import ToDoCard from './ToDoCard';
import TopClassesCard from './TopClassesCard';
import CalendarCard from './CalendarCard';
import ReportsCard from './ReportsCard';

function Home() {
  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) return 'Good morning';
    if (currentHour < 16) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="body-container">
      <ContentBox contentHeading={getGreeting()}>
        <div
          style={{
            display: 'flex',
            gap: '16px',
            flexWrap: 'wrap',
            marginTop: '20px',
            maxHeight: '484px',
            minHeight: '450px',
            height: 'calc(70vh - 40px)',
          }}
        >
          <ToDoCard />
          <TopClassesCard />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '350px',
              height: '100%',
              gap: '16px',
            }}
          >
            <CalendarCard />
            <ReportsCard />
          </div>
        </div>
      </ContentBox>
    </div>
  );
}

export default Home;
