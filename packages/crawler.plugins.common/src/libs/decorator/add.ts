

import { SenecaConfig } from "../contansts/config";

export interface IAdd {
    partten: string | Object;
    options?: any;
    target: any;
    key: string;
}

export const Add = <T>(partten: string | Object, options?: T) => {
    return (target: any, key: string, value: PropertyDescriptor) => {
        let metadata: IAdd = { partten, options, target, key };
        let metadataList: Array<IAdd> = [];

        if (!Reflect.hasOwnMetadata(SenecaConfig._add, target.constructor)) {
            Reflect.defineMetadata(SenecaConfig._add, metadataList, target.constructor);
        } else {
            metadataList = Reflect.getOwnMetadata(SenecaConfig._add, target.constructor);
        }

        metadataList.push(metadata);
    };
};
