import { Reloader, Supplier } from "@infoloop-opensource/abstractions";

export function toSimpleReloader<T>(supplier: Supplier<T>): Reloader<T> {
    let data: T | undefined = undefined;
    return {
        getCurrent() {
            return data;
        },
        async reload() {
            data = await supplier();
        }
    };
}
