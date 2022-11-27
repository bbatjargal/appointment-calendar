import CellInHour from "./CellInHour";

function DayColumnHourly({dayIndex = -1})
{
    return (
        <>
            <CreateHours dayIndex={ dayIndex } />
        </>
    );
};

function CreateHours({ dayIndex = -1 })
{
    var elementsHour = [];
    for(var i = 0; i < 24; i++)
    {
        elementsHour.push(<CellInHour key={i} offset={i} dayIndex={ dayIndex } />);
    }
    return elementsHour;
}

export default DayColumnHourly;