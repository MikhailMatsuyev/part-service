export enum StorageType {
    localStorage = 'localStorage',
    sessionStorage = 'sessionStorage'
}

export const WebStorage = (name: string = StorageType.localStorage): any => {
    const nameStorage = (name === StorageType.localStorage || name === StorageType.sessionStorage)
        ? name
        : StorageType.localStorage;
    return (target: Object, propertyKey: string): void => {
        Object.defineProperty(target, propertyKey, {
            get: () => JSON.parse(window[nameStorage].getItem(propertyKey)) || '',
            set(newValue: string) {
                try {
                    window[nameStorage].setItem(propertyKey, JSON.stringify(newValue));
                } catch (e) {
                    console.error(e);
                }
            },
            enumerable: true,
            configurable: true
        });
    };
};
