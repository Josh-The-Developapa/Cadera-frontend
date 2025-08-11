import React from 'react';
import ContentBox from '../../components/ContentBox/ContentBox';
import CalendarCard from '../Home/CalendarCard';
import { useParams, Link } from 'react-router-dom';
import { ChevronDown, ChevronRight } from 'lucide-react';

function IndividualClass() {
  const { class_name } = useParams();
  return (
    <div className="body-container">
      <ContentBox
        contentHeading={
          <span>
            <Link to="/comments" style={{ color: '#A6A6A6' }}>
              Comments
            </Link>
            <ChevronRight
              className="inline w-5 h-5 mx-1 align-middle mb-[2px] ml-[4px]"
              strokeWidth={3}
              style={{ color: '#A6A6A6' }}
            />
            <span className="font-[500]">{class_name}</span>
          </span>
        }
      ></ContentBox>
    </div>
  );
}

export default IndividualClass;
