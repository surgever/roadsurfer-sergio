import { useParams, Link } from "react-router-dom";
const Day = props => {
    let { station, week } = useParams();
    let dayBookings = props.bookings;
    dayBookings.forEach((booking, index) => {
        dayBookings[index].action = (booking.startDate.includes(props.date) ? 'start' : 'finish')
    })

    return (
        <div className="cell day">
            <h2 className="day--number">{props.date.slice(-2)}</h2>
            {props.bookings.map(b => (
                <Link key={b.id} 
                    className="day-booking btn"
                    to={"/station/"+ station +"/week/" + week +"/booking/" + b.id}
                >   
                    <span className={"booking-icon " + b.action}></span>
                    {b.customerName.replace(/[^a-zA-Z0-9- ]/g, '').substr(0, 20)}
                </Link>
                )
            )}
        </div>
    )
}

export default Day