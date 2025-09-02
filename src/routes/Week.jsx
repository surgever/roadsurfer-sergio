import { useOutletContext, useParams, Outlet, Link } from 'react-router-dom';
import { useEffect, useState } from "react"

import {DndContext} from '@dnd-kit/core';
import Draggable from '@/components/Draggable';
import Droppable from '@/components/Droppable';

import Day from "@/components/Day"
import BookingItem from "@/components/BookingItem"

const Week = props => {
  let { station, week, booking } = useParams()
  const [bookingsData] = useOutletContext();

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
    /*
    // Seach bookings of this day
    let todayBookings = bookingsData.filter(b =>
      () || b.endDate.includes(newDateString))
    )
    // Add day to array
    days.push(<Day key={i}
      date={newDateString}
      bookings={todayBookings}
    />);
    */
  }
  const getTodayBookings = (dayString) => {
    return bookingsData.filter((b, index, array) => {
      if(b.startDate.includes(dayString)) {
         array[index].action = "start";
         return true;
      } else if(b.endDate.includes(dayString)) {
         array[index].action = "finish";
         return true;
      } else {
        return false;
      }
    })
  }

  const containers = ['A', 'B', 'C'];
  const [parent, setParent] = useState(null);
  const draggableMarkup = (
    <Draggable id="draggable">Drag me</Draggable>
  );
  const handleDragEnd = (event) => {
    const {over} = event;
    // If the item is dropped over a container, set it as the parent
    // otherwise reset the parent to `null`
    setParent(over ? over.id : null);
  }

  return (
    <>
      { ! booking ?
      <>
        <div className="calendar">
          {days.map(date => (
            <Day key={date} id={date} date={date}>
              {getTodayBookings(date).map(b => (
                <BookingItem id={b.id} action={b.action} customerName={b.customerName} />
              ))}
            </Day>
          ))}
        </div>
      </>
        :
        <Outlet context={[bookingsData]} />
      }
    </>
  );
};
export default Week;