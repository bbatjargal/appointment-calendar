import { useRef, useState } from 'react';
import { Box, Grid, Stack } from '@mui/material';
import { nanoid } from 'nanoid';

import DayColumnHourly from './DayColumnHourly';
import ViewLeft from './../base/ViewLeft';

function ViewWeekly()
{
    const currentDatetime = (new Date()).toString();
    const [selectedDatetime, setSelectedDatetime] = useState(currentDatetime);
    const days = useRef(["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"])

    return (
        <>
            <div>{ selectedDatetime }</div>
            
            <Stack>
                <Grid container  className="calendarViewContainer">
                    <Grid container className="calendarViewTop">
                    
                        <Grid item sx={{ width: '60px', }}>
                            <Box className="cellBorderLeft cellBorderBottom calendarHeaderCell" />
                        </Grid>
                        <Grid item xs> 
                            <Grid container spacing={0} padding={0} columns={7} >
                                { 
                                    days.current.map( (day, i) => 
                                    { 
                                        return ( 
                                            <Grid item xs={1} key={ nanoid() }>
                                                <Box className="cellBorderLeft cellBorderBottom calendarHeaderCell" >{ day }</Box>
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
                                    days.current.map((day, i) => {
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