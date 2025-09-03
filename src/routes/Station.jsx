import { useParams, Outlet, Navigate } from 'react-router-dom';
import { useContext, useEffect, useState } from "react"

import StationContext from "@/context/StationContext";

const Station = props => {
    let { station } = useParams()
    const [stationBookings, setStationBookings] = useState([])
    const { stationData, setSetStationData } = useContext(StationContext);

    // Load station data when station changes
    const loadStation = () => {
        const endpoint = new URL("https://605c94c36d85de00170da8b4.mockapi.io/stations/"+station)
        fetch(endpoint, {
            method: 'GET',
            headers: {'content-type':'application/json'},
        }).then(res => {
            if (res.ok) {
                return res.json();
            }
        }).then(data => {
            setSetStationData({
                id :    data.id,
                name :  data.name
            })
            setStationBookings(data.bookings)
            
        }).catch(error => {
            // handle error
        })
    }

  useEffect(loadStation, [station]);

  return (
      <Outlet context={[stationBookings, setStationBookings]} />
  );
};
export default Station;