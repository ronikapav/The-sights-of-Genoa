import { useState, useEffect } from 'react';
import { data } from './data';
import './App.css';

const App = () => {
  const [attractions, setAttractions] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [landmark, setLandmark] = useState(data);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === landmark.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);
    return () => clearInterval(interval);
  }, 
  [landmark.length]);

  function delAttractions(id) {
    let newAttractions = landmark.filter(attraction => attraction.id !== id);
    setLandmark(newAttractions);

    if (attractions > 0) setAttractions(attractions => attractions - 1);
    else setAttractions(0);
  }

  const previousAttractions = () => {
    setAttractions(attractions =>{
      attractions--;
      if(attractions<0) {
        return landmark.length-1;
      }
      return attractions;
    })
  }

  const nextAttractions = () => {
    setAttractions(attractions =>{
      attractions++;
      if(attractions>landmark.length-1) {
        attractions=0;
      }
      return attractions;
    })
  }

  return (
    <div className='App'>
      {
      landmark.length > 0 &&
        <div>
          <div className='appButton'>
            <button className='buttonDel' onClick={() => delAttractions(landmark[attractions].id)}>Visited</button>
          </div>
          <div className='appAttractions'>
            <h1>Explore Genoa's {landmark.length} Attractions</h1>
          </div>
          <div>
            {currentImageIndex % 2 === 0 ? (
            <img className='appImg' width='500px' src={landmark[attractions].imageOne} alt='pictures' />
            ) : (
            <img className='appImg' width='500px' src={landmark[attractions].imageTwo} alt='pictures' />
            )}
          </div>
          <div className='appDescription'>
            <h2>{landmark[attractions].name}</h2>
          </div>
          <div className='appDescription delDescription'>
            <p>{landmark[attractions].description}</p>
          </div>
          <div className='appButtons'>
            <button className='buttonPrev' onClick={previousAttractions}>Prev</button>
            <button className='buttonNext' onClick={nextAttractions}>Next</button>
          </div>
        </div>
      }
   </div>
  );
};
  
export default App;
