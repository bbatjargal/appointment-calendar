import CalendarView from './View/CalendarView';
import { CalendarContextProvider } from './CalendarContext';

function Calendar()
{
    return (
        <>
            <CalendarContextProvider>
                <div className="calendarContainer">
                    <CalendarView />
                </div>
            </CalendarContextProvider>
        </>
    );
}

export default Calendar;