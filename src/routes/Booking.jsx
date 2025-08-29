import { useOutletContext, useParams, Outlet } from 'react-router-dom';

import BookingDetails from "@/components/BookingDetails"

const Booking = props => {
  let { booking } = useParams();
  const [bookingsData] = useOutletContext();
  const bookingInfo = bookingsData.find(b => b.id === booking); 

    return (
        <BookingDetails data={bookingInfo} />
      
    );
  };
export default Booking;