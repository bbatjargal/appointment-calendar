import { createContext, useState, useEffect, useCallback } from 'react';

import Utils from './Utils';

export const CalendarContext = createContext({
    currentDatetime: null,
    offset: null,
    offsetUnit: null,
    activatedDatetime: null,
    startDatetime: null,
    endDatetime: null,
    viewType: null,
    daysOfWeek: null,
    daysOfWeekAbbr: null,
    fullnameOfMonths: null,
    nameOfMonthsAbbr: null,
    setOffset: null,
    incrementOffset: null,
    decrementOffset: null,
});

export function CalendarContextProvider({ children }) {    
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const daysOfWeekAbbr = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const fullnameOfMonths = [ "January", "February", "March", "April", "May", "June",
                               "July", "August", "September", "October", "November", "December" ];
    const nameOfMonthsAbbr = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];

    const now = new Date();
    const dtStartOfRange = Utils.addDays(now, 0 - now.getDay()).toString();
    const dtEndOfRange = Utils.addDays(now, 6 - now.getDay()).toString();

    const [currentDatetime, setCurrentDatetime] = useState(now.toString());
    const [activatedDatetime, setActivatedDatetime] = useState(now.toString());
    const [startDatetime, setStartDatetime] = useState(dtStartOfRange);
    const [endDatetime, setEndDatetime] = useState(dtEndOfRange);

    const [offset, setOffset] = useState(0);
    const [offsetUnit, setOffsetUnit] = useState(7);
    const [viewType, setViewType] = useState('weekly');

    const setCurrentOffset = (value) => {
        setOffset(value);
    };
    const incrementOffset = () => {
        setOffset(offset + 1);
    };
    const decrementOffset = () => {
        setOffset(offset - 1);
    };

    const updateDateRange = useCallback(() => {
        const dtActived = Utils.addDays(currentDatetime, offset * offsetUnit);
        const dtStartOfRange = Utils.addDays(dtActived, 0 - dtActived.getDay());
        const dtEndOfRange = Utils.addDays(dtActived, 6 - dtActived.getDay());
        setActivatedDatetime(dtActived.toString());
        setStartDatetime(dtStartOfRange.toString());
        setEndDatetime(dtEndOfRange.toString());
      }, [currentDatetime, offset, offsetUnit]);

    useEffect(() => {
        updateDateRange();
    }, [updateDateRange]);
    
    //const dtSelected  = Utils.addDays(dtActive, dayIndex - now.getDay());
    //const setStartOfRange = (value) => {
    //    setStartDatetime();
    //}; 

    /*
    const currentDatetime = {
        dayOfWeek: now.getDay(),
        year: now.getFullYear(),
        month: now.getMonth(),
        dayOfMonth: now.getDate(),
        minutes: now.getMinutes(),
        seconds: now.getSeconds(),
        milliSeconds: now.getMilliseconds(),
        toString: now.toString()
    }; */

    return (
        <CalendarContext.Provider value={{
            currentDatetime: now.toString(),
            offset: offset,
            offsetUnit: offsetUnit,
            activatedDatetime: activatedDatetime,
            startDatetime: startDatetime,
            endDatetime: endDatetime,
            viewType: viewType,
            daysOfWeek: daysOfWeek,
            daysOfWeekAbbr: daysOfWeekAbbr,
            fullnameOfMonths: fullnameOfMonths,
            nameOfMonthsAbbr: nameOfMonthsAbbr,
            setOffset: setCurrentOffset,
            incrementOffset: incrementOffset,
            decrementOffset: decrementOffset,
        }}>
            {children}
        </CalendarContext.Provider>
    );
}