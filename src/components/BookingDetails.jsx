import { useContext } from 'react';
import { useParams, useNavigate } from "react-router-dom";

import StationContext from "@/context/StationContext";

const BookingDetails = props => {
    const navigate = useNavigate()
    let { station, week, booking } = useParams();
    const data = props.data
    const getDuration = (start, end) => {
        const diffTime = Math.abs(new Date(start) -  new Date(end))
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
        let output = ""
        if( Math.floor(diffDays / 30) > 1) output += Math.floor(diffDays / 30) + " months "
        else if( Math.floor(diffDays / 30) === 1) output += "1 month "
        if( diffDays % 30 > 1) output += (diffDays % 30) + " days"
        else if( diffDays % 30 === 1) output += " 1 day"
        return output
    }

    const { stationData } = useContext(StationContext);

    return (
        <div className="bookingDetails">
            <h2 className="bookingDetails--title">Booking details: #{parseInt(booking)}</h2>

                {/* { stationData.name && "Station context name:" stationData.name } */}
            
            { data ?
            <dl className="bookingDetails--content">
                {data.customerName && <>
                    <dt>Customer Name</dt>
                    <dd>{data.customerName.replace(/[^a-zA-Z0-9- ]/g, '')}</dd>
                </> }
                {data.pickupReturnStationId && <>
                    <dt>Return station</dt>
                    <dd>
                        { parseInt(data.pickupReturnStationId) == parseInt(stationData.id) ?
                            stationData.name.replace(/[^a-zA-Z0-9- ]/g, '')
                        :  
                            "#"+ data.pickupReturnStationId
                        }
                    </dd>
                </> }
                {data.startDate && <>
                    <dt>
                        <span className="booking-icon start"></span>
                        Start date
                    </dt>
                    <dd>{new Date(data.startDate).toLocaleString()}</dd>
                </> }
                {data.endDate && <>
                    <dt>
                        <span className="booking-icon finish"></span>
                        End date
                    </dt>
                    <dd>{new Date(data.endDate).toLocaleString()}</dd>
                </> }
                {data.startDate && data.endDate && <>
                    <dt> Duration </dt>
                    <dd>{ getDuration( data.startDate, data.endDate ) }</dd>
                </> }
            </dl> :
            <div className="bookingDetails--loading">
                <div className="bookingDetails--loader"></div>
                Loading...
            </div>
            }
        </div>
    )
}

export default BookingDetails