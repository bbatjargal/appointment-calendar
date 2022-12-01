import { nanoid } from 'nanoid';

import { useState, useContext } from 'react';
import { Box, ThemeProvider, createTheme } from '@mui/system';
import { DialogTitle, DialogActions, DialogContent } from '@mui/material';
import { Dialog, Button, TextField, Stack } from '@mui/material';

import { CalendarContext } from '../../CalendarContext';
import { AppointmentContext } from '../../AppointmentContext';
import Utils from './../../Utils';

const themeLight = createTheme({
    palette: {
        layout: {
        },
    }
});

function CellInMinute({ dayIndex=-1, part = 'first', hour=0, period='' })
{    
    const [open, setOpen] = useState(false);
    const calendarContext = useContext(CalendarContext);
    const appointmentContext = useContext(AppointmentContext);

    const activatedDatime = new Date(calendarContext.activatedDatetime);
    const dtSelected = Utils.addDays(calendarContext.activatedDatetime, dayIndex - activatedDatime.getDay());
    
    const groupKey = Utils.createGroupKey(dtSelected.getFullYear(), 
                                          dtSelected.getMonth() + 1, 
                                          dtSelected.getDate(), 
                                          hour,
                                          period, 
                                          part);
    const [eventKey, setEventKey] = useState('');
    const [eventGroupKey, setEventGroupKey] = useState(groupKey);
    const [selectedDatetime, setSelectedDatetime] = useState(dtSelected.toString());
    const [eventTitle, setEventTitle] = useState('');
    const [eventDescription, setEventDescription] = useState('');
    
    const handleClickOnCell = ({ dayIndex, part, hour, period }) => {
        const dt  = Utils.addDays(activatedDatime, dayIndex - activatedDatime.getDay());
        const dtSelected = new Date(dt.getFullYear(), dt.getMonth() + 1, dt.getDate(), hour, dt.getMinutes());

        setSelectedDatetime(dtSelected.toDateString());
        setOpen(true);
    };

    const handleClose =() => {
        setOpen(false);
    };

    const handleClickOnSave = () => {

        if(!eventKey) 
        {
            // null or empty or undefined
            const txtEventKey = nanoid();
            setEventKey(txtEventKey);
            appointmentContext.addAppointment({
                key: txtEventKey,
                groupKey: eventGroupKey,
                title: eventTitle,
                desc: eventDescription,
                datetime: selectedDatetime,
            });            
        }
        else
        {
            const item = {
                key: eventKey,
                groupKey: eventGroupKey,
                title: eventTitle,
                desc: eventDescription,
            };
            appointmentContext.updateAppointment(item);  

        }
        setOpen(false);
    };

    const handleClickOnDelete = (groupKey, eventKey) => {        
        const currentItem = appointmentContext.items[groupKey].find(x => x.key === eventKey);
        appointmentContext.deleteAppointment(currentItem);
        setOpen(false);
    };

    const handleClickOnCalendarItem = (groupKey, eventKey) => {

        const currentItem = appointmentContext.items[groupKey].find(x => x.key === eventKey);
        
        setEventKey(currentItem.key);
        setEventGroupKey(currentItem.groupKey);
        setSelectedDatetime(currentItem.datetime);
        setEventTitle(currentItem.title);
        setEventDescription(currentItem.desc);
    };

    var cellPayload = {
        dayIndex: dayIndex,
        part: part,
        hour: hour,
        period: period,
        // activatedDatime: activatedDatime
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
    
    const groupKeyExits = (eventGroupKey in appointmentContext.items);

    return (
        <>
            <ThemeProvider theme={themeLight}>
                <Box className={ listOfClasses.join(" ") } 
                    onClick={ () => handleClickOnCell(cellPayload) }  >
                        <Stack direction="row" spacing={0}>
                            {                                 
                                groupKeyExits && appointmentContext.items[eventGroupKey].map((item, i) => {                                    
                                    return (
                                        <div key={ nanoid() } 
                                            className="calendarItem" 
                                            style={ { width: "100%" } }
                                            onClick={ () => handleClickOnCalendarItem(item.groupKey, item.key) }
                                            >
                                            { item.title } 
                                        </div>
                                    );
                                })
                            }
                        </Stack>
                    </Box>
            </ThemeProvider>
            
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>New event - {selectedDatetime}</DialogTitle>
                <DialogContent>
                    <input type="hidden" value={ eventKey } />
                    <input type="hidden" value={ eventGroupKey } />
                    <input type="hidden" value={ selectedDatetime } />
                    <TextField             
                        margin="dense"
                        autoFocus
                        id="txtTitle"
                        label="Title"
                        fullWidth
                        variant="standard"
                        autoComplete='off'
                        value={eventTitle}
                        onChange={(e) => { setEventTitle(e.target.value); }}
                    />
                    <TextField                        
                        margin="dense"
                        id="txtDescription"
                        label="Description"
                        multiline
                        rows={3}
                        fullWidth
                        variant="standard"
                        value={eventDescription}
                        onChange={(e) => { setEventDescription(e.target.value); }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    { 
                        !!eventKey &&
                        <Button onClick={() => handleClickOnDelete(eventGroupKey, eventKey) }>Delete</Button>
                    }
                    <Button type="submit" onClick={handleClickOnSave}>Save</Button>
                </DialogActions>
            </Dialog>
        </>
    );

}

//function clickOnCell({ dayIndex, part, hour, period })
//{
//}


export default CellInMinute;