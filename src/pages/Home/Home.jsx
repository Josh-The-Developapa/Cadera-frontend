import React from 'react';
import ContentBox from '../../components/ContentBox/ContentBox';
import './Home.css';
import ToDoCard from './ToDoCard';
import TopClassesCard from './TopClassesCard';
import CalendarCard from './CalendarCard';
import ReportsCard from './ReportsCard';

function Home() {
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) return 'Good morning';
    if (currentHour < 16) return 'Good afternoon';
    return 'Good evening';
  };

  // Check authentication status on component mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('authToken'); // Adjust based on your token storage
        if (!token) return;

        const response = await fetch('/api/whoami', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();
        if (data.status === 'success' && data.user) {
          setUserInfo(data.user);
          setShowLoginPopup(true);
          
          // Auto-hide popup after 3 seconds
          setTimeout(() => {
            setShowLoginPopup(false);
          }, 3000);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      }
    };

    checkAuth();
  }, []);

  return (
    <div className="body-container">
      {/* Login Confirmation Popup */}
      {showLoginPopup && userInfo && (
        <div
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            zIndex: 1000,
            minWidth: '280px',
            border: '1px solid #e5e7eb',
            animation: 'slideIn 0.3s ease-out',
          }}
        >
          <CheckCircle2 
            size={20} 
            style={{ color: '#10b981', flexShrink: 0 }} 
          />
          <div style={{ flex: 1 }}>
            <div 
              style={{ 
                fontSize: '14px', 
                fontWeight: '500', 
                color: '#1f2937',
                marginBottom: '2px'
              }}
            >
              Welcome back!
            </div>
            <div 
              style={{ 
                fontSize: '12px', 
                color: '#6b7280' 
              }}
            >
              Logged in as {userInfo.email || userInfo.username || 'User'}
            </div>
          </div>
          <X
            size={16}
            onClick={() => setShowLoginPopup(false)}
            style={{
              color: '#9ca3af',
              cursor: 'pointer',
              flexShrink: 0,
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#6b7280')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#9ca3af')}
          />
        </div>
      )}

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

      {/* CSS Animation for popup */}
      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

export default Home;
