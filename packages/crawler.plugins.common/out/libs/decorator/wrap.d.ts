export interface IWrap {
    partten: string | Object;
    options?: any;
    target: any;
    key: string;
}
export declare const Wrap: <T>(partten: string | Object, options?: T | undefined) => (target: any, key: string, value: PropertyDescriptor) => void;
