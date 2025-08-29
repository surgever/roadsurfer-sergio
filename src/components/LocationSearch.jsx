import { useContext, useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom";

import Autocomplete from "@/components/Autocomplete"

import StationContext from "@/context/StationContext";

const LocationSearch = props => {
    const { stationData, setSetStationData } = useContext(StationContext);
    let { station, week } = useParams();

    const setStationCallback = (selectedId, selectedName) => {
        setSetStationData({
            id :    selectedId,
            name :  selectedName
        })
    }

    const URL = "https://605c94c36d85de00170da8b4.mockapi.io/stations"
    return (
        <div className="locationSearch">
            <Autocomplete
                endpoint={URL}
                param="name"
                defaultValue={(station && stationData.name ? stationData.name : "")}
                pathBefore="station/"
                pathAfter={ "/week/" + (week ?  week : "2021-03-08")}
                placeholder="Find pickup station"
                callback={setStationCallback}
            />
        </div>
    )
}

export default LocationSearch