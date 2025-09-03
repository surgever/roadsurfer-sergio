import { useOutletContext, useParams, Outlet, useLocation, Link } from 'react-router-dom';
import { useEffect, useState } from "react"

import {DndContext} from '@dnd-kit/core';

import Day from "@/components/Day"
import BookingItem from "@/components/BookingItem"

const Week = props => {
  let { station, week, booking } = useParams()
  const [bookingsData, setStationBookings] = useOutletContext();

  // Make list of days of the week
  const days = []
  for (let i = 0; i < 7; i++) {
    // Generate day number string
    let newDate = new Date(week)
    // check date is valid 
    if(! (newDate instanceof Date) || isNaN(newDate)) {
        newDate = new Date()
    }
    newDate.setDate( newDate.getDate() + i )
    newDate.setHours(newDate.getHours()+2); // Avoid summer time errors
    let newDateString = newDate.toJSON().slice(0,10)
    days.push(newDateString);
  }

  const handleDragEnd = (event) => {
    const {over, active} = event;
    if(over) {
      // Prepare the new date to be changed
      let movedItem = bookingsData.findIndex(b => b.id === active.data.current.id)
      let key = (active.data.current.action == "start" ? "startDate" : "endDate")
      let newTime = over.id + bookingsData[movedItem][key].slice(-14)
      // Alter date and update state
      let newBookingsData = bookingsData
      newBookingsData[movedItem][key] = newTime
      setStationBookings(newBookingsData)
      // API code example 
      const endpoint = "https://605c94c36d85de00170da8b4.mockapi.io/stations/"+station+"/bookings/" + active.data.current.id
      console.log("\n    async () => {\n      try {\n        const response = await fetch(\n          '"+endpoint+"',\n         {\n          method: 'PUT',\n          headers: {'Content-Type': 'application/json'},\n          body: JSON.stringify({ "+key+": '"+newTime+"' }),\n        });\n        if (!response.ok) {\n          throw new Error('Failed to update booking');\n        }\n        const data = await response.json();\n        console.log('Booking updated:', data);\n      } catch (error) {alert('Error updating booking')}\n    }")
    }
  };

  return (
    <>
      { ! booking ?
        <div className="calendar">
          <DndContext onDragEnd={handleDragEnd}>
            {days.map(date => (
              <Day key={date} id={date} date={date} bookingsData={bookingsData} />
            ))}
          </DndContext>
        </div>
        :
        <Outlet context={[bookingsData]} />
      }
    </>
  );
};
export default Week;