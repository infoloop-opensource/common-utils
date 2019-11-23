export const anonymizeClass = (clazz) => {
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
export const decorateClass = (clazz, decorator) => {
    return decorator(clazz);
};
