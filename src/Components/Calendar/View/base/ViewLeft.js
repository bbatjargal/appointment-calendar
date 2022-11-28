import HourCell from "./HourCell";

function ViewLeft()
{
    return (
        <>
            <CreateHourColumn />
        </>
    );
};

function CreateHourColumn()
{
    var elementsHour = [];
    for(var i = 0; i < 24; i++)
    {
        elementsHour.push(<HourCell key={i} offset={i} />);
    }
    return elementsHour;
}

export default ViewLeft;