import MinuteCell from './MinuteCell'

function HourCell({offset}) {

    const periodAMPM = Math.floor(offset / 12) === 0 ? 'AM' : 'PM';
    var hourOfDay = offset % 12;
    if(offset === 12)
        hourOfDay = 12;

    return (
        <>
            <MinuteCell period={periodAMPM} hour={hourOfDay} />  
            <MinuteCell />  
        </>
    );
}

export default HourCell;