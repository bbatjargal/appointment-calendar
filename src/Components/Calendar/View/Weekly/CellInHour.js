import { Fragment } from "react";
import CellInMinute from "./CellInMinute";

function CellInHour({offset, dayIndex }) {

    const periodAMPM = Math.floor(offset / 12) === 0 ? 'AM' : 'PM';    
    var hourOfDay = offset % 12;

    if(offset === 12)
        hourOfDay = 12;

    return (
        <>
            <CellInMinute part='first' period={periodAMPM} hour={hourOfDay} dayIndex={dayIndex} />  
            <CellInMinute part='second' period={periodAMPM} hour={hourOfDay} dayIndex={dayIndex}  />  
        </>
    );
}

export default CellInHour;