import {
    uniqueArray,
    toMap,
    groupBy,
    groupTransformedBy,
    uniqueMaker,
    lower_bound,
    removeFromSortedArray,
    isEmptyArrayOrNull,
    isEmptyNonnullArray,
    intersection,
    difference
} from './collection';
import {expect} from 'chai';
import {Comparator} from "@infoloop-opensource/abstractions";

describe('test uniqueArray', () => {
    it('uniqueArray empty list should return empty list', () => {
        expect(uniqueArray([])).to.be.an('array').that.is.empty;
    });

    it('uniqueArray list with no identical elements should return sorted list', () => {
        expect(uniqueArray([1, 2, 3])).to.be.an('array').that.deep.equals([1, 2, 3]);

        expect(uniqueArray([3, 2, 1])).to.be.an('array').that.deep.equals([1, 2, 3]);

        expect(uniqueArray([1])).to.be.an('array').that.deep.equals([1]);

        expect(uniqueArray([1, 14, 123, 114], (a, b) => a - b)).to.be.an('array').that.deep.equals([1, 14, 114, 123]);
    });

    it('uniqueArray list with identical elements should return expected list', () => {
        expect(uniqueArray([1, 2, 3, 1, 3])).to.be.an('array').that.deep.equals([1, 2, 3]);

        expect(uniqueArray([3, 2, 1, 3, 2, 1])).to.be.an('array').that.deep.equals([1, 2, 3]);

        expect(uniqueArray([1, 2, 1, 1, 2])).to.be.an('array').that.deep.equals([1, 2]);
    });
});

describe('test toMap', () => {
    it('toMap([]) should equal empty map', () => {
        expect(toMap([], (set: Set<string>) => set.size)).to.a('map').that.is.empty;
    });

    it('toMap non-empty list should return correct map', () => {
        const str1 = 'abc';
        const str2 = 'cc';
        const str3 = 'zebra';

        const map = toMap([str1, str2, str3], (str: string) => str.charAt(0));
        expect(map).to.be.an('map');
        expect(map.get('a')).to.equal(str1);
        expect(map.get('c')).to.equal(str2);
        expect(map.get('z')).to.equal(str3);
    });
});

describe('test groupBy', () => {
    it('groupBy([]) should equal empty map', () => {
        expect(groupBy([], (set: Set<string>) => set.size)).to.a('map').that.is.empty;
    });

    it('groupBy non-empty list should return correct map', () => {
        const str1 = 'abc';
        const str21 = 'ccc';
        const str22 = 'cab';
        const str3 = 'zebra';

        const map = groupBy([str1, str21, str22, str3], (str: string) => str.charAt(0));
        expect(map).to.be.an('map');
        expect(map.get('a')).to.be.an('array').that.deep.equals([str1]);
        expect(map.get('c')).to.be.an('array').that.deep.equals([str21, str22]);
        expect(map.get('z')).to.be.an('array').that.deep.equals([str3]);
    });
});

describe('test groupTransformedBy', () => {
    it('groupTransformedBy([]) should equal empty map', () => {
        expect(groupTransformedBy([], (set: Set<string>) => set.size, (ele: any) => '')).to.a('map').that.is.empty;
    });

    it('groupTransformedBy non-empty list should return correct map', () => {
        const str1 = '123';
        const str21 = '456';
        const str22 = '789';
        const str3 = '1111';

        const map = groupTransformedBy([str1, str21, str22, str3], (str: string) => str.charAt(0), str => Number.parseInt(str));
        expect(map).to.be.an('map');
        expect(map.get('1')).to.be.an('array').that.deep.equals([123, 1111]);
        expect(map.get('4')).to.be.an('array').that.deep.equals([456]);
        expect(map.get('7')).to.be.an('array').that.deep.equals([789]);
    });
});

describe('uniqueMaker should work properly', () => {
    it('uniqueMaker should return empty results', () => {
        expect(uniqueMaker().and([]).unique()).to.deep.equal([]);
        expect(uniqueMaker([]).and([]).unique()).to.deep.equal([]);
    });

    it('uniqueMaker should return expected results on Case 1', () => {
        expect(uniqueMaker([1, 2, 3]).unique()).to.deep.equal([1, 2, 3]);
    });

    it('uniqueMaker should return expected results on Case 2', () => {
        expect(uniqueMaker([1, 2, 3]).and([1, 3]).unique()).to.deep.equal([1, 2, 3]);
    });

    it('uniqueMaker should return expected results on Case 3', () => {
        expect(uniqueMaker([1, 2, 3]).and([3, 2, 1]).unique()).to.deep.equal([1, 2, 3]);
    });

    it('uniqueMaker should return expected results on Case 4', () => {
        expect(uniqueMaker([1, 2, 3]).and([1]).and([3]).and([2]).unique()).to.deep.equal([1, 2, 3]);
    });

    it('uniqueMaker should return expected results on Case 4', () => {
        expect(uniqueMaker([1]).and([2]).and([3]).and([2]).unique()).to.deep.equal([1, 2, 3]);
    });
});

describe('lower_bound should work properly', () => {
    const compareNumber: Comparator<number> = (a, b) => {
        if (a === b) {
            return 0;
        }
        if (a < b) {
            return -1;
        }
        return 1;
    };

    const compareNumberPair: Comparator<[number, number]> = (a, b) => {
        return compareNumber(a[0], b[0]) || compareNumber(a[1], b[1]);
    };

    it('lower_bound should return expected value on Case 1', () => {
        expect(lower_bound([], 1)).to.equal(0);
    });

    it('lower_bound should return expected value on Case 2', () => {
        expect(lower_bound([1], 1)).to.equal(0);
    });

    it('lower_bound should return expected value on Case 3', () => {
        expect(lower_bound([1], 2)).to.equal(1);
    });

    it('lower_bound should return expected value on Case 4', () => {
        expect(lower_bound([1], 1)).to.equal(0);
    });

    it('lower_bound should return expected value on Case 5', () => {
        expect(lower_bound([1], 0)).to.equal(0);
    });

    it('lower_bound should return expected value on Case 6', () => {
        expect(lower_bound([1, 2, 3, 4, 5], 0)).to.equal(0);
    });

    it('lower_bound should return expected value on Case 7', () => {
        expect(lower_bound([1, 2, 3, 4, 5], 1)).to.equal(0);
    });

    it('lower_bound should return expected value on Case 8', () => {
        expect(lower_bound([1, 2, 3, 4, 5], 2)).to.equal(1);
    });

    it('lower_bound should return expected value on Case 9', () => {
        expect(lower_bound([1, 2, 3, 4, 5], 3)).to.equal(2);
    });

    it('lower_bound should return expected value on Case 10', () => {
        expect(lower_bound([1, 2, 3, 4, 5], 4)).to.equal(3);
    });

    it('lower_bound should return expected value on Case 11', () => {
        expect(lower_bound([1, 2, 3, 4, 5], 5)).to.equal(4);
    });

    it('lower_bound should return expected value on Case 12', () => {
        expect(lower_bound([1, 2, 2, 4, 5], 3)).to.equal(3);
    });

    it('lower_bound should return expected value on Case 13', () => {
        expect(lower_bound([[1, 2], [1, 3], [2, 2], [3, 1]], [2, 2], compareNumberPair)).to.equal(2);
    });

    it('lower_bound should return expected value on Case 14', () => {
        expect(lower_bound([[1, 2], [1, 3], [2, 2], [3, 1]], [1, 4], compareNumberPair)).to.equal(2);
    });

    it('lower_bound should return expected value on Case 15', () => {
        expect(lower_bound([[1, 2], [1, 3], [2, 2], [3, 1]], [1, 2], compareNumberPair)).to.equal(0);
    });

    it('lower_bound should return expected value on Case 16', () => {
        expect(lower_bound([[1, 2], [1, 3], [2, 2], [3, 1]], [4, 4], compareNumberPair)).to.equal(4);
    });
});

describe('removeFromSortedArray should work', () => {
    it('removeFromSortedArray should work on Case 1', () => {
        const arr = [1, 2, 3, 4, 5];
        removeFromSortedArray(arr, 2);
        expect(arr).to.deep.equal([1, 3, 4, 5]);
    });

    it('removeFromSortedArray should work on Case 2', () => {
        const arr = [1, 2, 3, 4, 5];
        removeFromSortedArray(arr, 1);
        expect(arr).to.deep.equal([2, 3, 4, 5]);
    });

    it('removeFromSortedArray should work on Case 3', () => {
        const arr = [1, 2, 3, 4, 5];
        removeFromSortedArray(arr, 5);
        expect(arr).to.deep.equal([1, 2, 3, 4]);
    });

    it('removeFromSortedArray should work on Case 4', () => {
        const arr = [1, 2, 2, 3, 4, 5];
        removeFromSortedArray(arr, 2);
        expect(arr).to.deep.equal([1, 3, 4, 5]);
    });

    it('removeFromSortedArray should work on Case 5', () => {
        const arr = [1];
        removeFromSortedArray(arr, 1);
        expect(arr).to.deep.equal([]);
    });

    it('removeFromSortedArray should work on Case 6', () => {
        const arr = [1, 1, 1, 1, 1];
        removeFromSortedArray(arr, 1);
        expect(arr).to.deep.equal([]);
    });
});


describe('isEmptyArrayOrNull', () => {
    it('Case 1', () => {
        expect(isEmptyArrayOrNull([])).to.be.true;
    });

    it('Case 2', () => {
        expect(isEmptyArrayOrNull(undefined)).to.be.true;
    });

    it('Case 3', () => {
        expect(isEmptyArrayOrNull(null)).to.be.true;
    });

    it('Case 4', () => {
        expect(isEmptyArrayOrNull([1])).to.be.false;
    });
});

describe('isEmptyNonnullArray', () => {
    it('Case 1', () => {
        expect(isEmptyNonnullArray([])).to.be.true;
    });

    it('Case 2', () => {
        expect(isEmptyNonnullArray(undefined)).to.be.false;
    });

    it('Case 3', () => {
        expect(isEmptyNonnullArray(null)).to.be.false;
    });

    it('Case 4', () => {
        expect(isEmptyNonnullArray([1])).to.be.false;
    });
});

describe('test intersection', () => {
    it('intersection of empty lists should return empty list', () => {
        expect(intersection([], [])).to.deep.equal([]);
    });

    it('intersection of lists with no common elements should return empty list', () => {
        expect(intersection([1, 2, 3], [4, 5])).to.deep.equal([]);
    });

    it('intersection of lists with common elements should return expected list', () => {
        expect(intersection([1, 2, 3], [1, 2, 3])).to.deep.equals([1, 2, 3]);

        expect(intersection([1, 2, 3, 4, 5], [1, 2])).to.deep.equals([1, 2]);

        expect(intersection([3, 4, 1234], [9, 3, 5, 1234, 4])).to.deep.equals([3, 4, 1234]);
    });
});

describe('test difference', () => {
    it('difference of empty lists should return empty list', () => {
        expect(difference([], [])).to.deep.equal([]);
    });

    it('difference of lists with no common elements should return empty list', () => {
        expect(difference([1, 2, 3], [4, 5])).to.deep.equal([1, 2, 3]);
    });

    it('difference of lists with common elements should return expected list', () => {
        expect(difference([1, 2, 3], [1, 2, 3])).to.deep.equals([]);

        expect(difference([1, 2, 3, 4, 5], [1, 2])).to.deep.equals([3, 4, 5]);

        expect(difference([3, 4, 1234], [9, 3, 5, 1234, 4])).to.deep.equals([]);
    });
});
