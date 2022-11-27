import { useRef } from 'react';
import CellInHour from "./CellInHour";

function DayColumnHourly()
{
    return (
        <>
            <CreateHours />
        </>
    );
};

function CreateHours()
{
    var elementsHour = [];
    for(var i = 0; i < 24; i++)
    {
        elementsHour.push(<CellInHour key={i} offset={i} />);
    }
    return elementsHour;
}

export default DayColumnHourly;