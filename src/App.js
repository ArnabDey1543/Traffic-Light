import { useReducer, useEffect, useState, Fragment } from 'react'

import './App.css';
import Data from './Data'
import Reducer from './Reducers/Trafficlight'

function App() {
  const [trafficlights, dispatch] = useReducer(Reducer, Data)

  const lightDurations = [10000, 5000, 3000];

  const [trafficlightIndex, setTrafficlightIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch({ trafficlightId: trafficlightIndex })
      setTrafficlightIndex((trafficlightIndex + 1) % 3);
    }, lightDurations[trafficlightIndex]);
    return () => {
      clearTimeout(timer);
    };
  });

  return (
    <Fragment>
      {
        trafficlights.length > 0 && (
          <div className='container'>
            <div className='trafficlight-box'>
              {
                trafficlights.map((trafficlight) => {
                  return <p key={trafficlight.id} id='trafficlight' style={{ backgroundColor: trafficlight.light, opacity: trafficlightIndex === trafficlight.id ? 1 : 0.3, boxShadow: trafficlightIndex === trafficlight.id ? '1px 1px 10px rgba(204, 204, 204, 0.5), -1px -1px 10px rgba(204, 204, 204, 0.5)' : null }} >
                  </p>
                })
              }
            </div>
          </div>
        )
      }
    </Fragment>
  );
}

export default App;
