
const Utils = {
    addDays: function (date, days) {
        var result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    },
    createGroupKey: function (year, month, day, hour, period, part) {
        var groupKey = "";
        groupKey += year.toString();
        groupKey += month.toString().padStart(2,"0");
        groupKey += day.toString().padStart(2,"0");
        groupKey += hour.toString().padStart(2,"0");

        if(period === 'AM')
            groupKey += '1';
        else
            groupKey += '2';
        if(part === 'first')
            groupKey += '1';
        else
            groupKey += '2';
        return groupKey;
    }
};

export default Utils;

