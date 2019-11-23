import {identity, compareNumber, compareNumberPair} from './lamda';
import {expect} from 'chai';

describe('identity', () => {
    it('Case 1', () => {
        expect(identity(1)).to.equal(1);
    });

    it('Case 2', () => {
        expect(identity('test')).to.equal('test');
    });
});

describe('compareNumber', () => {
    it('Case 1', () => {
        expect(compareNumber(1, 1)).to.equal(0);
    });

    it('Case 2', () => {
        expect(compareNumber(1, 2)).to.be.lessThan(0);
    });

    it('Case 3', () => {
        expect(compareNumber(2, 1)).to.be.greaterThan(0);
    });

    it('Case 4', () => {
        expect(compareNumber(Number.MAX_VALUE, Number.MIN_VALUE)).to.be.greaterThan(0);
    });

    it('Case 5', () => {
        expect(compareNumber(Number.MIN_VALUE, Number.MAX_VALUE)).to.be.lessThan(0);
    });
});

describe('compareNumberPair', () => {
    it('Case 1', () => {
        expect(compareNumberPair([1, 2], [1, 2])).to.equal(0);
    });

    it('Case 2', () => {
        expect(compareNumberPair([1, 1], [1, 2])).to.be.lessThan(0);
    });

    it('Case 3', () => {
        expect(compareNumberPair([1, 4], [2, 0])).to.be.lessThan(0);
    });

    it('Case 4', () => {
        expect(compareNumberPair([1, 1], [1, 0])).to.be.greaterThan(0);
    });

    it('Case 5', () => {
        expect(compareNumberPair([2, 0], [1, 3])).to.be.greaterThan(0);
    });
});
