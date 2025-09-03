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
        <div className="draggable" ref={setNodeRef} style={style} >
            <span className="bookingItem--handle" {...listeners} {...attributes}></span>
            <Link key={data.id} 
                className="day-booking btn"
                to={"/station/"+ station +"/week/" + week +"/booking/" + data.id}
            >   
                <span className={"booking-icon " + data.action}></span>
                {data.customerName.replace(/[^a-zA-Z0-9- ]/g, '').substr(0, 20)}
            </Link>
        </div>
    )
}

export default BookingItem