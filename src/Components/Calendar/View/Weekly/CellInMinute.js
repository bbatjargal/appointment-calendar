import { nanoid } from 'nanoid';

import { useState, useContext } from 'react';
import { Box, ThemeProvider, createTheme } from '@mui/system';
import { DialogTitle, DialogActions, DialogContent } from '@mui/material';
import { Dialog, Button, TextField, Stack } from '@mui/material';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

import { CalendarContext } from '../../CalendarContext';
import Utils from './../../Utils';
/*
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
*/
const themeLight = createTheme({
    palette: {
        layout: {
        },
    }
});

function CellInMinute({ dayIndex=-1, part = 'first', hour=0, period='' })
{    
    const [open, setOpen] = useState(false);
    const [selectedDatetime, setSelectedDatetime] = useState(null);
    const calendarContext = useContext(CalendarContext);
    const [count, setCount] = useState(0);

    var appointments = ["item 1", "item 2"];


    const handleClickOnCell = ({ dayIndex, part, hour, period, currentDatetime }) => {
        const now = new Date(currentDatetime);
        const selected  = Utils.addDays(currentDatetime, dayIndex - now.getDay()).toDateString();
        setSelectedDatetime(selected);
        setOpen(true);
        //console.log(dayIndex, part, hour, period);
    };
    const handleClose =() => {
        setOpen(false);
    };

    var cellPayload = {
        dayIndex: dayIndex,
        part: part,
        hour: hour,
        period: period,
        currentDatetime: calendarContext.currentDatetime,
    }; 

    var listOfClasses = ["cellBorderLeft", "cell", "cellHourText"];
    if(part === 'first')
    {
        if(hour !== 0)
            listOfClasses.push("cellBorderTop");
    }
    else
    { 
        listOfClasses.push("cellBorderTopDashed");
    }

    return (
        <>
            <ThemeProvider theme={themeLight}>
                <Box className={ listOfClasses.join(" ") } 
                    onClick={ () => handleClickOnCell(cellPayload) }  >
                        <Stack direction="row" spacing={0}>
                            {
                                appointments.map((item, i) => {                                    
                                    return (
                                        <div key={nanoid()} className="calendarItem" style={{ width: "100%" }}>{ item }</div>
                                    );
                                })
                            }
                        </Stack>
                    </Box>
            </ThemeProvider>
            
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New event - {selectedDatetime}</DialogTitle>
                <DialogContent>
                    <TextField             
                        margin="dense"
                        autoFocus
                        id="name"
                        label="Title"
                        fullWidth
                        variant="standard"
                        autoComplete='off'
                    />
                    <TextField                        
                        margin="dense"
                        id="name"
                        label="Description"
                        multiline
                        rows={3}
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );

}

function clickOnCell({ dayIndex, part, hour, period })
{
}


export default CellInMinute;