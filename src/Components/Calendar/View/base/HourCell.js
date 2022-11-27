import MinuteCell from './MinuteCell'

function HourCell({offset}) {

    const periodAMPM = Math.floor(offset / 12) === 0 ? 'AM' : 'PM';
    console.log((offset / 12), periodAMPM, offset);
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