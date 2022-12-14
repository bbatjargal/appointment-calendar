import { useContext } from 'react';
import { Box, Grid, Stack, Button } from '@mui/material';
import { nanoid } from 'nanoid';

import DayColumnHourly from './DayColumnHourly';
import ViewLeft from './../base/ViewLeft';
import { CalendarContext } from '../../CalendarContext';

import Utils from './../../Utils';


function handleClickOnToday(setOffset)
{
    setOffset(0); 
}

function handleClickOnPrev(decrementOffset)
{
    decrementOffset();
}

function handleClickOnNext(incrementOffset)
{
    incrementOffset(); 
}

function ViewWeekly()
{
    const calendarContext = useContext(CalendarContext);
    const now = new Date(calendarContext.currentDatetime);

    // currently activated date in the weekly view.
    const dtActived = new Date(calendarContext.activatedDatetime);
    const startDatetime  = new Date(calendarContext.startDatetime);
    const endDatetime  = new Date(calendarContext.endDatetime);

    return (
        <>
            <div><b>Today: {now.toDateString()}</b></div>
            <div>{ startDatetime.toDateString() } - { endDatetime.toDateString() }</div>
            <br />
            <Stack>
                <Grid container>
                    <Grid item xs>
                        <Button variant="outlined" onClick={ () => handleClickOnToday( calendarContext.setOffset ) }>
                            TODAY
                        </Button>
                        &nbsp;&nbsp;
                        <Button variant="outlined" onClick={ () => handleClickOnPrev( calendarContext.decrementOffset ) }>
                            &lt;
                        </Button>
                        <Button variant="outlined" onClick={ () => handleClickOnNext(calendarContext.incrementOffset) }>
                            &gt;
                        </Button>
                    </Grid>
                </Grid>
                <br />
                <Grid container  className="calendarViewContainer">
                    <Grid container className="calendarViewTop">
                        <Grid item sx={{ width: '60px', }}>
                            <Box className="cellBorderLeft cellBorderBottom calendarHeaderCell" />
                        </Grid>
                        <Grid item xs> 
                            <Grid container spacing={0} padding={0} columns={7} >
                                { 
                                    calendarContext.daysOfWeekAbbr.map( (day, dayIndex) => 
                                    {                                         
                                        const dtSelected  = Utils.addDays(dtActived, dayIndex - now.getDay());
                                        const isToday =  now.toDateString() ===dtSelected.toDateString();
                                        const dtText = calendarContext.nameOfMonthsAbbr[dtSelected.getMonth()] + " " + dtSelected.getDate();
                                        return ( 
                                            <Grid item xs={1} key={ nanoid() }>
                                                <Box className={ `cellBorderLeft cellBorderBottom calendarHeaderCell ${ isToday && "today" }`}>
                                                { dtText }, { day }</Box>
                                            </Grid>
                                        );
                                    })
                                }
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container className="calendarViewBody">
                        <Grid item sx={{ width: '60px', }}>
                            <ViewLeft></ViewLeft>
                        </Grid>
                        <Grid item xs>
                            <Grid container spacing={0} padding={0} columns={7} >
                                {
                                    calendarContext.daysOfWeekAbbr.map((day, i) => {
                                        return (
                                            <Grid item xs={1} key={ nanoid() }>
                                                <DayColumnHourly dayIndex={i} ></DayColumnHourly>
                                            </Grid>
                                        );
                                    })                                  
                                }
                            </Grid>  
                        </Grid>
                    </Grid>  
                </Grid>          
            </Stack>     
        </>
    );
}

export default ViewWeekly;