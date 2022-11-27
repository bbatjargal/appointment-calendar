import { Box, ThemeProvider, createTheme } from '@mui/system';

const themeLight = createTheme({
    palette: {
        layout: {
        },
    }
});

function CellInMinute({ hour=-1, period='' })
{    
    if(hour > 0)
    {
        return (
            <ThemeProvider theme={themeLight}>
                <Box className="cellBorderTop cellBorderLeft cell cellHourText "></Box>
            </ThemeProvider>
        );
    }
    else
    { 
        const boxClassName = "".concat("cellBorderLeft cell ",  (hour !== 0) && "cellBorderTopDashed");
        return (
            <ThemeProvider theme={themeLight}>
                <Box className={ boxClassName } />
            </ThemeProvider>
        );
    }

}

export default CellInMinute;