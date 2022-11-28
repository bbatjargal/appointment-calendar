import CalendarView from './View/CalendarView';
import { CalendarContextProvider } from './CalendarContext';
import { AppointmentContextProvider } from './AppointmentContext';

function Calendar()
{
    return (
        <>
            <CalendarContextProvider>
                <AppointmentContextProvider>
                    <div className="calendarContainer">
                        <CalendarView />
                    </div>
                </AppointmentContextProvider>
            </CalendarContextProvider>
        </>
    );
}

export default Calendar;