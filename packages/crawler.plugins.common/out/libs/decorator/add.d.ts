export interface IAdd {
    partten: string | Object;
    options?: any;
    target: any;
    key: string;
}
export declare const Add: <T>(partten: string | Object, options?: T | undefined) => (target: any, key: string, value: PropertyDescriptor) => void;
