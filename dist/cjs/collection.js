"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ReducerFactory = /** @class */ (function () {
    function ReducerFactory() {
    }
    ReducerFactory.getToMapReducer = function (getter) {
        return function (map, element, ith) {
            map.set(getter(element, ith), element);
            return map;
        };
    };
    ReducerFactory.getToMapReducerWithTransformer = function (getter, transformer) {
        return function (map, element, ith) {
            map.set(getter(element, ith), transformer(element, ith));
            return map;
        };
    };
    ReducerFactory.getGroupByReducer = function (getter) {
        return function (map, element, ith) {
            var key = getter(element, ith);
            var existingArray = map.get(key);
            if (!existingArray) {
                map.set(key, [element]);
                return map;
            }
            existingArray.push(element);
            return map;
        };
    };
    ReducerFactory.getGroupByReducerWithTransformer = function (getter, transformer) {
        return function (map, element, ith) {
            var key = getter(element, ith);
            var existingArray = map.get(key);
            if (!existingArray) {
                map.set(key, [transformer(element, ith)]);
                return map;
            }
            existingArray.push(transformer(element, ith));
            return map;
        };
    };
    return ReducerFactory;
}());
function uniqueArray(elements, comparator) {
    return (comparator ? elements.sort(comparator) : elements.sort())
        .reduce(function (array, element) {
        if (array.length === 0 || array[array.length - 1] !== element) {
            array.push(element);
        }
        return array;
    }, []);
}
exports.uniqueArray = uniqueArray;
function uniqueField(elements, getter, comparator) {
    return uniqueArray(elements.map(getter), comparator);
}
exports.uniqueField = uniqueField;
function toMap(elements, getter) {
    return elements
        .reduce(ReducerFactory.getToMapReducer(getter), new Map());
}
exports.toMap = toMap;
function toTransformedMap(elements, getter, transformer) {
    return elements
        .reduce(ReducerFactory.getToMapReducerWithTransformer(getter, transformer), new Map());
}
exports.toTransformedMap = toTransformedMap;
function groupBy(elements, getter) {
    return elements
        .reduce(ReducerFactory.getGroupByReducer(getter), new Map());
}
exports.groupBy = groupBy;
function groupTransformedBy(elements, getter, transformer) {
    return elements
        .reduce(ReducerFactory.getGroupByReducerWithTransformer(getter, transformer), new Map());
}
exports.groupTransformedBy = groupTransformedBy;
function fillMap(map, keys, filler) {
    keys.forEach(function (key) {
        if (!map.has(key)) {
            map.set(key, filler(key));
        }
    });
    return map;
}
exports.fillMap = fillMap;
function intersection(a, b) {
    var sortedA = uniqueArray(a, function (x, y) { return x - y; });
    var sortedB = uniqueArray(b, function (x, y) { return x - y; });
    var shared = [];
    for (var i = 0, j = 0; i < sortedA.length && j < sortedB.length;) {
        if (sortedA[i] < sortedB[j]) {
            i++;
        }
        else if (sortedA[i] > sortedB[j]) {
            j++;
        }
        else {
            shared.push(sortedA[i]);
            i++;
            j++;
        }
    }
    return shared;
}
exports.intersection = intersection;
function difference(a, b) {
    var sortedA = uniqueArray(a, function (x, y) { return x - y; });
    var sortedB = uniqueArray(b, function (x, y) { return x - y; });
    var diff = [];
    for (var i = 0, j = 0; i < sortedA.length; i++) {
        while (j < sortedB.length && sortedB[j] < sortedA[i]) {
            j++;
        }
        if (j >= sortedB.length || sortedB[j] !== sortedA[i]) {
            diff.push(sortedA[i]);
        }
    }
    return diff;
}
exports.difference = difference;
/**
 * @param sortedAsc in ascending order
 * @param target
 * @param comparator
 * @return index
 */
function lower_bound(sortedAsc, target, comparator) {
    var first = 0, count = sortedAsc.length;
    if (!comparator) {
        while (count) {
            var step = count >> 1;
            var dest = first + step;
            if (sortedAsc[dest] < target) {
                first = dest + 1;
                count -= step + 1;
            }
            else {
                count = step;
            }
        }
        return first;
    }
    while (count) {
        var step = count >> 1;
        var dest = first + step;
        if (comparator(sortedAsc[dest], target) < 0) {
            first = dest + 1;
            count -= step + 1;
        }
        else {
            count = step;
        }
    }
    return first;
}
exports.lower_bound = lower_bound;
function isInArray(sortedAsc, target) {
    var index = lower_bound(sortedAsc, target);
    return index !== sortedAsc.length && sortedAsc[index] === target;
}
exports.isInArray = isInArray;
function removeFromSortedArray(sortedAsc, target) {
    var index = lower_bound(sortedAsc, target);
    if (index === sortedAsc.length || sortedAsc[index] !== target) {
        return;
    }
    var i = index;
    for (var j = index + 1; j < sortedAsc.length;) {
        if (sortedAsc[j] === target) {
            j++;
        }
        else {
            sortedAsc[i++] = sortedAsc[j++];
        }
    }
    sortedAsc.length = i;
}
exports.removeFromSortedArray = removeFromSortedArray;
var UniqueMaker = /** @class */ (function () {
    function UniqueMaker(elements, comparator) {
        var _a;
        if (comparator === void 0) { comparator = undefined; }
        this.placer = [];
        this.comparator = comparator;
        if (elements) {
            (_a = this.placer).push.apply(_a, elements);
        }
    }
    UniqueMaker.prototype.and = function (elements) {
        var _a;
        (_a = this.placer).push.apply(_a, elements);
        return this;
    };
    UniqueMaker.prototype.unique = function () {
        return uniqueArray(this.placer, this.comparator);
    };
    return UniqueMaker;
}());
function uniqueMaker(elements, comparator) {
    return new UniqueMaker(elements, comparator);
}
exports.uniqueMaker = uniqueMaker;
exports.isEmptyArrayOrNull = function (array) {
    return !array || array.length === 0;
};
exports.isEmptyNonnullArray = function (array) {
    return !!array && array.length === 0;
};
