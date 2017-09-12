

import { SenecaConfig } from "../contansts/config";

export interface IInit {
    target: any;
    key: string;
}

export const Init = <T>() => {
    return (target: any, key: string, value: PropertyDescriptor) => {
        let metadata: IInit = {  target, key };
        let metadataList: Array<IInit> = [];

        if (!Reflect.hasOwnMetadata(SenecaConfig._init, target.constructor)) {
            Reflect.defineMetadata(SenecaConfig._init, metadataList, target.constructor);
        } else {
            metadataList = Reflect.getOwnMetadata(SenecaConfig._init, target.constructor);
        }

        metadataList.push(metadata);
    };
};
