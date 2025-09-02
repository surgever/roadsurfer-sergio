const Day = props => {

    return (
        <div className="cell day">
            <h2 className="day--number">{props.date.slice(-2)}</h2>
            {props.children}
        </div>
    )
}

export default Day