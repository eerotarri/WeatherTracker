/**
 * Converts unix timestamp (e.g. 1677957563) to date and time usable for the UI
 * @param {number} unix - unix timestamp
 * @returns {JSX.Element} - formatted date and time
 */

export const unixTimeStampToDate = (unix) => {
    const date = new Date((unix) * 1000);
    const hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const monthName = date.toLocaleString('en-US', {month: 'long'});
    const day = date.getUTCDate();
    const formattedTime = hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0'); // prevents 01:05 from showing as 1:5

    return (
        <div className="bottom-left">
            <div data-testid="date" className="date">{ monthName + ' ' + day }</div>
            <div data-testid="time" className="small-grey" >{ formattedTime }</div>
        </div>
    )
}

