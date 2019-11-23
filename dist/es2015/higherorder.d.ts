import { RuntimeClassDecorator } from "@infoloop-opensource/abstractions";
export declare const anonymizeClass: <Clazz extends import("@infoloop-opensource/abstractions").Constructor<{}>>(clazz: Clazz) => Clazz;
/**
 * decorate class at runtime
 * @param clazz
 * @param decorator
 */
export declare const decorateClass: <T>(clazz: import("@infoloop-opensource/abstractions").Constructor<T>, decorator: RuntimeClassDecorator<T>) => import("@infoloop-opensource/abstractions").Constructor<T>;
