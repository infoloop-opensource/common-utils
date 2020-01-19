class ReducerFactory {
    constructor() {
    }
    static getToMapReducer(getter) {
        return (map, element, ith) => {
            map.set(getter(element, ith), element);
            return map;
        };
    }
    static getToMapReducerWithTransformer(getter, transformer) {
        return (map, element, ith) => {
            map.set(getter(element, ith), transformer(element, ith));
            return map;
        };
    }
    static getGroupByReducer(getter) {
        return (map, element, ith) => {
            const key = getter(element, ith);
            const existingArray = map.get(key);
            if (!existingArray) {
                map.set(key, [element]);
                return map;
            }
            existingArray.push(element);
            return map;
        };
    }
    static getGroupByReducerWithTransformer(getter, transformer) {
        return (map, element, ith) => {
            const key = getter(element, ith);
            const existingArray = map.get(key);
            if (!existingArray) {
                map.set(key, [transformer(element, ith)]);
                return map;
            }
            existingArray.push(transformer(element, ith));
            return map;
        };
    }
}
export function uniqueArray(elements, comparator) {
    return (comparator ? elements.sort(comparator) : elements.sort())
        .reduce((array, element) => {
        if (array.length === 0 || array[array.length - 1] !== element) {
            array.push(element);
        }
        return array;
    }, []);
}
export function uniqueField(elements, getter, comparator) {
    return uniqueArray(elements.map(getter), comparator);
}
export function toMap(elements, getter) {
    return elements
        .reduce(ReducerFactory.getToMapReducer(getter), new Map());
}
export function toTransformedMap(elements, getter, transformer) {
    return elements
        .reduce(ReducerFactory.getToMapReducerWithTransformer(getter, transformer), new Map());
}
export function groupBy(elements, getter) {
    return elements
        .reduce(ReducerFactory.getGroupByReducer(getter), new Map());
}
export function groupTransformedBy(elements, getter, transformer) {
    return elements
        .reduce(ReducerFactory.getGroupByReducerWithTransformer(getter, transformer), new Map());
}
export function fillMap(map, keys, filler) {
    keys.forEach(key => {
        if (!map.has(key)) {
            map.set(key, filler(key));
        }
    });
    return map;
}
export function intersection(a, b) {
    const sortedA = uniqueArray(a, (x, y) => x - y);
    const sortedB = uniqueArray(b, (x, y) => x - y);
    const shared = [];
    for (let i = 0, j = 0; i < sortedA.length && j < sortedB.length;) {
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
export function difference(a, b) {
    const sortedA = uniqueArray(a, (x, y) => x - y);
    const sortedB = uniqueArray(b, (x, y) => x - y);
    const diff = [];
    for (let i = 0, j = 0; i < sortedA.length; i++) {
        while (j < sortedB.length && sortedB[j] < sortedA[i]) {
            j++;
        }
        if (j >= sortedB.length || sortedB[j] !== sortedA[i]) {
            diff.push(sortedA[i]);
        }
    }
    return diff;
}
/**
 * @param sortedAsc in ascending order
 * @param target
 * @param comparator
 * @return index
 */
export function lower_bound(sortedAsc, target, comparator) {
    let first = 0, count = sortedAsc.length;
    if (!comparator) {
        while (count) {
            const step = count >> 1;
            const dest = first + step;
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
        const step = count >> 1;
        const dest = first + step;
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
export function isInArray(sortedAsc, target) {
    const index = lower_bound(sortedAsc, target);
    return index !== sortedAsc.length && sortedAsc[index] === target;
}
export function removeFromSortedArray(sortedAsc, target) {
    const index = lower_bound(sortedAsc, target);
    if (index === sortedAsc.length || sortedAsc[index] !== target) {
        return;
    }
    let i = index;
    for (let j = index + 1; j < sortedAsc.length;) {
        if (sortedAsc[j] === target) {
            j++;
        }
        else {
            sortedAsc[i++] = sortedAsc[j++];
        }
    }
    sortedAsc.length = i;
}
class UniqueMaker {
    constructor(elements, comparator = undefined) {
        this.placer = [];
        this.comparator = comparator;
        if (elements) {
            this.placer.push(...elements);
        }
    }
    and(elements) {
        this.placer.push(...elements);
        return this;
    }
    unique() {
        return uniqueArray(this.placer, this.comparator);
    }
}
export function uniqueMaker(elements, comparator) {
    return new UniqueMaker(elements, comparator);
}
export const isEmptyArrayOrNull = (array) => {
    return !array || array.length === 0;
};
export const isEmptyNonnullArray = (array) => {
    return !!array && array.length === 0;
};
