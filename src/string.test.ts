import {pad, toStringWithLeadingZeros} from "./string";
import {expect} from "chai";

describe('pad', () => {
    it('Case 1', () => {
        expect(pad('123', 0, 0)).to.equal('123');
        expect(pad('123', 1, 1)).to.equal('123');
        expect(pad('123', 2, 2)).to.equal('123');
        expect(pad('123', '9', 3)).to.equal('123');
    });

    it('Case 2', () => {
        expect(pad('123', 'Z', 4)).to.equal('Z123');
    });
});

describe('ttoStringWithLeadingZeros', () => {
    it('Case 1', () => {
        expect(toStringWithLeadingZeros(0, 3, 0)).to.equal('000');
        expect(toStringWithLeadingZeros(0, 3, 2)).to.equal('000.00');
        expect(toStringWithLeadingZeros(0, 1, 0)).to.equal('0');
    });

    it('Case 2', () => {
        expect(toStringWithLeadingZeros(1.1, 3, 1)).to.equal('001.1');
        expect(toStringWithLeadingZeros(99.6, 1, 0)).to.equal('100');
        expect(toStringWithLeadingZeros(99.6, 3, 2)).to.equal('099.60');
    });
});


