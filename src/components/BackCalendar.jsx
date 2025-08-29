import { Link, useParams, useNavigate } from "react-router-dom";

import Autocomplete from "@/components/Autocomplete"

const BackCalendar = props => {
    const navigate = useNavigate()
    let { station, week, booking } = useParams()
    const handleGoBack = (e) => { 
        navigate("..")
    }
    return (
        <Link className="backCalendar btn" to={"/station/"+station+"/week/"+week}>  
            <span className="backCalendar--icon"></span>
            <span className="backCalendar--label">Back to calendar</span>
        </Link>
    )
}

export default BackCalendar