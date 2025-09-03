import { useParams, Link } from "react-router-dom";
import { useDraggable } from '@dnd-kit/core';

const BookingItem = props => {
    let { station, week } = useParams();
    const data = props.data

    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        id: props.id,
        data : props.data
    });
    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;

    return (
        <Link key={data.id} 
            className="day-booking btn draggable"
            to={"/station/"+ station +"/week/" + week +"/booking/" + data.id}
            ref={setNodeRef} style={style} {...listeners} {...attributes}
        >   
            <span className={"booking-icon " + data.action}></span>
            {data.customerName.replace(/[^a-zA-Z0-9- ]/g, '').substr(0, 20)}
            <span className="bookingItem--handle"></span>
        </Link>
    )
}

export default BookingItem