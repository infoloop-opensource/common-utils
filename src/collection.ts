import {BiTransformer, Transformer, Comparator} from "@infoloop-opensource/abstractions";

type ArrayElementMapper<ElementType, MappedType> = BiTransformer<ElementType, number, MappedType>;

interface ArrayReducer<ReducedType, OriginalType> {
    (reduced: ReducedType, element: OriginalType, ith: number): ReducedType
}

class ReducerFactory {
    private constructor() {
    }

    static getToMapReducer<T, KeyType>(getter: ArrayElementMapper<T, KeyType>): ArrayReducer<Map<KeyType, T>, T> {
        return (map: Map<KeyType, T>, element: T, ith: number) => {
            map.set(getter(element, ith), element);
            return map;
        };
    }

    static getToMapReducerWithTransformer<T, KeyType, TargetType>(getter: ArrayElementMapper<T, KeyType>,
                                                                  transformer: ArrayElementMapper<T, TargetType>): ArrayReducer<Map<KeyType, TargetType>, T> {
        return (map: Map<KeyType, TargetType>, element: T, ith: number) => {
            map.set(getter(element, ith), transformer(element, ith));
            return map;
        };
    }

    static getGroupByReducer<T, KeyType>(getter: ArrayElementMapper<T, KeyType>): ArrayReducer<Map<KeyType, T[]>, T> {
        return (map: Map<KeyType, T[]>, element: T, ith: number) => {
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

    static getGroupByReducerWithTransformer<T, KeyType, TargetType>(getter: ArrayElementMapper<T, KeyType>,
                                                                    transformer: ArrayElementMapper<T, TargetType>): ArrayReducer<Map<KeyType, TargetType[]>, T> {
        return (map: Map<KeyType, TargetType[]>, element: T, ith: number) => {
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

export function uniqueArray<T>(elements: T[], comparator?: (a: T, b: T) => number): T[] {
    return (comparator ? elements.sort(comparator) : elements.sort())
        .reduce((array: T[], element: T) => {
            if (array.length === 0 || array[array.length - 1] !== element) {
                array.push(element);
            }
            return array;
        }, []);
}

export function uniqueField<T, D>(elements: T[], getter: Transformer<T, D>, comparator?: Comparator<D>): D[] {
    return uniqueArray(elements.map(getter), comparator);
}

export function toMap<T, KeyType>(elements: T[], getter: (T, ith?: number) => KeyType): Map<KeyType, T> {
    return elements
        .reduce(ReducerFactory.getToMapReducer<T, KeyType>(getter), new Map());
}

export function toTransformedMap<T, KeyType, TargetType>(elements: T[],
                                                         getter: ArrayElementMapper<T, KeyType>,
                                                         transformer: ArrayElementMapper<T, TargetType>): Map<KeyType, TargetType> {
    return elements
        .reduce(ReducerFactory.getToMapReducerWithTransformer<T, KeyType, TargetType>(getter, transformer), new Map());
}

export function groupBy<T, KeyType>(elements: T[], getter: ArrayElementMapper<T, KeyType>): Map<KeyType, T[]> {
    return elements
        .reduce(ReducerFactory.getGroupByReducer<T, KeyType>(getter), new Map());
}

export function groupTransformedBy<T, KeyType, TargetType>(elements: T[],
                                                           getter: ArrayElementMapper<T, KeyType>,
                                                           transformer: ArrayElementMapper<T, TargetType>): Map<KeyType, TargetType[]> {
    return elements
        .reduce(ReducerFactory.getGroupByReducerWithTransformer(getter, transformer), new Map());
}

export function fillMap<K, V>(map: Map<K, V>, keys: K[], filler: Transformer<K, V>): Map<K, V> {
    keys.forEach(key => {
        if (!map.has(key)) {
            map.set(key, filler(key));
        }
    });
    return map;
}

export function intersection(a: number[], b: number[]): number[] {
    const sortedA = uniqueArray(a, (x, y) => x - y);
    const sortedB = uniqueArray(b, (x, y) => x - y);
    const shared: number[] = [];
    for (let i = 0, j = 0; i < sortedA.length && j < sortedB.length;) {
        if (sortedA[i] < sortedB[j]) {
            i++;
        } else if (sortedA[i] > sortedB[j]) {
            j++;
        } else {
            shared.push(sortedA[i]);
            i++;
            j++;
        }
    }
    return shared;
}

export function difference(a: number[], b: number[]): number[] {
    const sortedA = uniqueArray(a, (x, y) => x - y);
    const sortedB = uniqueArray(b, (x, y) => x - y);
    const diff: number[] = [];
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
export function lower_bound<T>(sortedAsc: T[], target: T, comparator?: Comparator<T>): number {
    let first = 0, count = sortedAsc.length;
    if (!comparator) {
        while (count) {
            const step = count >> 1;
            const dest = first + step;
            if (sortedAsc[dest] < target) {
                first = dest + 1;
                count -= step + 1;
            } else {
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
        } else {
            count = step;
        }
    }
    return first;
}

export function isInArray<T>(sortedAsc: T[], target: T): boolean {
    const index = lower_bound(sortedAsc, target);
    return index !== sortedAsc.length && sortedAsc[index] === target;
}

export function removeFromSortedArray<T>(sortedAsc: T[], target: T): void {
    const index = lower_bound(sortedAsc, target);
    if (index === sortedAsc.length || sortedAsc[index] !== target) {
        return;
    }
    let i = index;
    for (let j = index + 1; j < sortedAsc.length;) {
        if (sortedAsc[j] === target) {
            j++;
        } else {
            sortedAsc[i++] = sortedAsc[j++];
        }
    }
    sortedAsc.length = i;
}

class UniqueMaker<T> {
    private readonly placer: T[];
    private readonly comparator: Comparator<T> | undefined;

    constructor(elements?: T[], comparator: Comparator<T> | undefined = undefined) {
        this.placer = [];
        this.comparator = comparator;
        if (elements) {
            this.placer.push(...elements);
        }
    }

    public and(elements: T[]): UniqueMaker<T> {
        this.placer.push(...elements);
        return this;
    }

    public unique(): T[] {
        return uniqueArray(this.placer, this.comparator);
    }
}

export function uniqueMaker<T>(elements?: T[], comparator?: (a: T, b: T) => number) {
    return new UniqueMaker(elements, comparator);
}


export const isEmptyArrayOrNull = <T>(array: T[] | undefined | null): boolean => {
    return !array || array.length === 0;
};

export const isEmptyNonnullArray = <T>(array: T[] | undefined | null): boolean => {
    return !!array && array.length === 0;
};
