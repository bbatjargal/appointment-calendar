import { Box } from '@mui/system';

function MinuteCell({ hour=-1, period='' })
{
    if(hour > 0)
    {
        return <Box className="cellBorderTop cellBorderLeft cell cellHourText "> { hour } { period }</Box>;
    }
    else
    { 
        const boxClassName = "".concat("cellBorderLeft cell ",  (hour !== 0) && "cellBorderTopDashed");
        return <Box className={ boxClassName } />;
    }
}

export default MinuteCell;