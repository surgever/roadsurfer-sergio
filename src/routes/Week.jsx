import { useOutletContext, useParams, Outlet } from 'react-router-dom';
import { useEffect, useState } from "react"

import Day from "@/components/Day"

const Week = props => {
  let { week, booking } = useParams()
  const [bookingsData] = useOutletContext();

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
    // Seach bookings of this day
    let todayBookings = bookingsData.filter(b =>
      (b.startDate.includes(newDateString) || b.endDate.includes(newDateString))
    )
    // Add day to array
    days.push(<Day key={i}
      date={newDateString}
      bookings={todayBookings}
    />);
  }

  return (
    <>
      { ! booking ?
        <div className="calendar"> {days} </div>
        :
        <Outlet context={[bookingsData]} />
      }
    </>
  );
};
export default Week;