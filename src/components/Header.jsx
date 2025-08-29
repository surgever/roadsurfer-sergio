import LocationSearch from "@/components/LocationSearch"
import WeekNaV from "@/components/WeekNav"
import BackCalendar from "@/components/BackCalendar"

const Header = () => {
    return (
        <header>
            <hgroup>
                <h1>Roadsurfer </h1>
            </hgroup>
                <LocationSearch />
                <WeekNaV />
                <BackCalendar />
        </header>
    )
}

export default Header