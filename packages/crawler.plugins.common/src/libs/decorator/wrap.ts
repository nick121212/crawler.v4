

import { SenecaConfig } from "../contansts/config";

export interface IWrap {
    partten: string | Object;
    options?: any;
    target: any;
    key: string;
}

export const Wrap = <T>(partten: string | Object, options?: T) => {
    return (target: any, key: string, value: PropertyDescriptor) => {
        let metadata: IWrap = { partten, options, target, key };
        let metadataList: Array<IWrap> = [];

        if (!Reflect.hasOwnMetadata(SenecaConfig._wrap, target.constructor)) {
            Reflect.defineMetadata(SenecaConfig._wrap, metadataList, target.constructor);
        } else {
            metadataList = Reflect.getOwnMetadata(SenecaConfig._wrap, target.constructor);
        }

        metadataList.push(metadata);
    };
};
