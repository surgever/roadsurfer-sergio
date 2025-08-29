import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom";

import Autocomplete from "@/components/Autocomplete"

const WeekNaV = props => {
    // get date from URL
    let { station, week } = useParams();
    // override if passed as prop
    if(props.currentDate) week = props.currentDate;
    // parse date object
    let thisDate = new Date(week) 
    // check date is valid 
    if(! (thisDate instanceof Date) || isNaN(thisDate)) {
        thisDate = new Date()
    }
    // get Monday with week start correction
    let thisMonday = thisDate
    thisMonday.setDate(thisDate.getDate() - (thisDate.getDay() || 7) + 1);
    // function that returns a ISO date string 
    const ISODate = (reference, change) => {
        let newDate = new Date(reference)
        newDate.setDate( reference.getDate() + change )
        newDate.setHours(newDate.getHours()+2); // Avoid summer time errors
        return newDate.toJSON().slice(0,10)
    }

    const URL = "https://605c94c36d85de00170da8b4.mockapi.io/stations"
    return (
        <nav className="weekNav">
        { station &&
            <>
                <Link className="weekNav--prev btn" to={"/station/"+ station +"/week/" + ISODate(thisMonday, - 7)} ></Link>
                {thisMonday.toLocaleDateString()} - {new Date(ISODate(thisMonday, 6)).toLocaleDateString()}
                <Link className="weekNav--next btn" to={"/station/"+ station +"/week/" + ISODate(thisMonday, 7)} ></Link>
            </>
        }
        </nav>
    )
}

export default WeekNaV