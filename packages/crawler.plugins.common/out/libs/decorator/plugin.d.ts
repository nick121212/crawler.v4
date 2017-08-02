export interface IPlugin {
    name: string;
    options?: any;
    target: any;
}
export declare const Plugin: <T>(name: string, options?: T | undefined) => (target: any) => void;
