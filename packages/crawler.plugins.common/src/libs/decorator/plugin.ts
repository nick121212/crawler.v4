

import { SenecaConfig } from "../contansts/config";

export interface IPlugin {
    name: string;
    options?: any;
    target: any;
}

export const Plugin = <T>(name: string, options?: T) => {
    return (target: any) => {
        let metadata: IPlugin = { name, options, target };

        Reflect.defineMetadata(SenecaConfig._plugin, metadata, target);
    };
};
