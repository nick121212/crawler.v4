import * as joi from 'joi';
import { SenecaConfig } from "../contansts/config";

export interface IValidate {
    joi?: joi.AnySchema<any>
    options?: any;
    target: any;
    key: string;
    index: number;
}

export const Validate = <T>(joi?: joi.AnySchema<any>, options?: any) => {
    // console.log(joi);
    return (target: any, key: string, index: number): any => {
        let metadata: IValidate = { joi, target, key, index, options };
        let metadataList: Array<IValidate> = [];

        if (!Reflect.hasOwnMetadata(SenecaConfig._validate, target.constructor)) {
            Reflect.defineMetadata(SenecaConfig._validate, metadataList, target.constructor);
        } else {
            metadataList = Reflect.getOwnMetadata(SenecaConfig._validate, target.constructor);
        }

        metadataList.push(metadata);
    }
}