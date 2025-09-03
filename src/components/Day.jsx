import {useDroppable} from '@dnd-kit/core';
import BookingItem from "@/components/BookingItem"

const Day = props => {
  const {isOver, setNodeRef} = useDroppable({
    id: props.id,
  });

  const filterToday = (b, index, array) => {
    if(b.startDate.includes(props.date)) {
        array[index].action = "start";
        return true;
    } else if(b.endDate.includes(props.date)) {
        array[index].action = "finish";
        return true;
    } else {
      return false;
    }
  }

    return (
        <div className={"cell day " + (isOver ?'on':'off')} ref={setNodeRef}>
            <h2 className="day--number">{props.date.slice(-2)}</h2>
            {props.bookingsData.filter(filterToday).map(b => (
                <BookingItem key={b.id} id={b.id} data={b} />
              ))}
            {props.children}
        </div>
    )
}

export default Day