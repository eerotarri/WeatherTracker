import { unixTimeStampToDate } from '../utils';

describe('unixTimeStampToDate is defined', () => {
    it('should be defined', () => {
        expect(unixTimeStampToDate).toBeDefined();
    });
});


describe('unixTimeStampToDate returns correctly', () => {
    it('should return a date', () => {
        const date = unixTimeStampToDate(1552777600);
        expect(date).toEqual(
        <div className="bottom-left">
            <div data-testid="date" className="date">March 16</div>
            <div data-testid="time" className="small-grey" >23:06</div>
        </div>
        );
    });
});
