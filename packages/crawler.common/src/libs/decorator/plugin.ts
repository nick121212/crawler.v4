

import { IPlugin } from "../contansts/iplugin";
import { SenecaConfig } from "../contansts/config";

export const Plugin = <T>(name: string, options?: T) => {
    return (target: any) => {
        let metadata: IPlugin = { name, options, target };

        Reflect.defineMetadata(SenecaConfig._plugin, metadata, target);
    };
}