export interface IInit {
    target: any;
    key: string;
}
export declare const Init: <T>() => (target: any, key: string, value: PropertyDescriptor) => void;
