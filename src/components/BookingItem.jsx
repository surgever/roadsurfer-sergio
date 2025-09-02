import { useParams, Link } from "react-router-dom";

const BookingItem = props => {
    let { station, week } = useParams();

    return (
        <Link key={props.id} 
            className="day-booking btn"
            to={"/station/"+ station +"/week/" + week +"/booking/" + props.id}
        >   
            <span className={"booking-icon " + props.action}></span>
            {props.customerName.replace(/[^a-zA-Z0-9- ]/g, '').substr(0, 20)}
        </Link>
    )
}

export default BookingItem