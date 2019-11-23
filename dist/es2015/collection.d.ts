import { BiTransformer, Transformer, Comparator } from "@infoloop-opensource/abstractions";
declare type ArrayElementMapper<ElementType, MappedType> = BiTransformer<ElementType, number, MappedType>;
export declare function uniqueArray<T>(elements: T[], comparator?: (a: T, b: T) => number): T[];
export declare function uniqueField<T, D>(elements: T[], getter: Transformer<T, D>, comparator?: Comparator<D>): D[];
export declare function toMap<T, KeyType>(elements: T[], getter: (T: any, ith?: number) => KeyType): Map<KeyType, T>;
export declare function toTransformedMap<T, KeyType, TargetType>(elements: T[], getter: ArrayElementMapper<T, KeyType>, transformer: ArrayElementMapper<T, TargetType>): Map<KeyType, TargetType>;
export declare function groupBy<T, KeyType>(elements: T[], getter: ArrayElementMapper<T, KeyType>): Map<KeyType, T[]>;
export declare function groupTransformedBy<T, KeyType, TargetType>(elements: T[], getter: ArrayElementMapper<T, KeyType>, transformer: ArrayElementMapper<T, TargetType>): Map<KeyType, TargetType[]>;
export declare function intersection(a: number[], b: number[]): number[];
export declare function difference(a: number[], b: number[]): number[];
/**
 * @param sortedAsc in ascending order
 * @param target
 * @param comparator
 * @return index
 */
export declare function lower_bound<T>(sortedAsc: T[], target: T, comparator?: Comparator<T>): number;
export declare function isInArray<T>(sortedAsc: T[], target: T): boolean;
export declare function removeFromSortedArray<T>(sortedAsc: T[], target: T): void;
declare class UniqueMaker<T> {
    private readonly placer;
    private readonly comparator;
    constructor(elements?: T[], comparator?: Comparator<T> | undefined);
    and(elements: T[]): UniqueMaker<T>;
    unique(): T[];
}
export declare function uniqueMaker<T>(elements?: T[], comparator?: (a: T, b: T) => number): UniqueMaker<T>;
export declare const isEmptyArrayOrNull: <T>(array: T[] | null | undefined) => boolean;
export declare const isEmptyNonnullArray: <T>(array: T[] | null | undefined) => boolean;
export {};
