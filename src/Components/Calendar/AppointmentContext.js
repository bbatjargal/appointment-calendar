import { createContext, useState, useEffect } from 'react';

export const AppointmentContext = createContext({
    items: []
}); 

export function AppointmentContextProvider({ children }) {

        
    var items = localStorage.getItem("appointments");

    if (items === null) {
        items = {};
    }
    else {
        items = JSON.parse(items);
    }

    const [appointments, setAppointments] = useState(items);

    const addAppointment = (item) => {

        const keyExists = item.groupKey in appointments;
        if(keyExists === false) {
            appointments[item.groupKey] = [];
        }
        appointments[item.groupKey].push(item);

        setAppointments({...appointments});
    };
    
    useEffect(() => {
        localStorage.setItem('appointments', JSON.stringify(appointments));
    }, [appointments]);


    return (
        <AppointmentContext.Provider value={{
            items: appointments,
            addAppointment: addAppointment
        }}>
            { children }
        </AppointmentContext.Provider>
    );
};