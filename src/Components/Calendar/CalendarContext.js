import { createContext, useState, useRef } from 'react';



export const CalendarContext = createContext({
    currentDatetime: null,
    currentOffset: null,
    startDatetime: null,
    endDatetime: null,
    viewType: null,
    daysOfWeek: null,
});


export function CalendarContextProvider({ children }) {
    const now = new Date();
    // const [currentDatetime, setCurrentDatetime] = useState(datetimeNow.toString());
    const daysOfWeek = useRef(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]);

    const currentDatetime = {
        dayOfWeek: now.getDay(),
        year: now.getFullYear(),
        month: now.getMonth(),
        dayOfMonth: now.getDate(),
        minutes: now.getMinutes(),
        seconds: now.getSeconds(),
        milliSeconds: now.getMilliseconds(),
        toString: now.toString()
    };

    return (
        <CalendarContext.Provider value={{
            currentDatetime: now.toString(),
            currentOffset: 0,
            startDatetime: null,
            endDatetime: null,
            viewType: "weekly",
            daysOfWeek: daysOfWeek.current,
        }}>
            {children}
        </CalendarContext.Provider>
    );
}