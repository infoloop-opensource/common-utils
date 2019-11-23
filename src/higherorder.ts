import {Class, RuntimeClassDecorator} from "@infoloop-opensource/abstractions";

export const anonymizeClass = <Clazz extends Class>(clazz: Clazz): Clazz => {
    return class extends clazz {
        constructor(...params) {
            super(...params);
        }
    };
};

/**
 * decorate class at runtime
 * @param clazz
 * @param decorator
 */
export const decorateClass = <T> (clazz: Class<T>, decorator: RuntimeClassDecorator<T>): Class<T> => {
    return decorator(clazz);
};
