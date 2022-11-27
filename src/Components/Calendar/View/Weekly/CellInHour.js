import { Fragment } from "react";
import CellInMinute from "./CellInMinute";

function CellInHour({offset}) {

    const periodAMPM = Math.floor(offset / 12) === 0 ? 'AM' : 'PM';
    console.log((offset / 12), periodAMPM, offset);
    var hourOfDay = offset % 12;
    
    if(offset === 12)
        hourOfDay = 12;

    return (
        <>
            <CellInMinute period={periodAMPM} hour={hourOfDay} />  
            <CellInMinute />  
        </>
    );
}

export default CellInHour;