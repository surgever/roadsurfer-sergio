// MAIN APP FILE
import { Routes, Route } from 'react-router-dom';

import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'

import Layout from "@/components/Layout"

import Station  from '@/routes/Station';
import Week  from '@/routes/Week';
import Booking   from '@/routes/Booking';
import Error404 from '@/routes/404.jsx';

import StationContext from "@/context/StationContext";

const App = () => {
  const [stationData, setSetStationData] = useState({});
  return (
    <StationContext.Provider value={{stationData, setSetStationData}}>
      <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="station/:station" element={<Station />}  > 
              <Route path="week/:week" element={<Week />}  > 
                <Route path="booking/:booking" element={<Booking />}> 
                </Route>
              </Route>
            </Route>
            <Route path="*" element={<Error404 />} />
          </Route>
      </Routes>
    </StationContext.Provider>
  );
};

export default App;