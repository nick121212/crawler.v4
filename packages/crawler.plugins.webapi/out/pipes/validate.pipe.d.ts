import { PipeTransform, ArgumentMetadata } from '@nestjs/common';
import * as Joi from "joi";
export declare class JoiValidatorPipe implements PipeTransform {
    private readonly schema;
    private readonly toValidate;
    constructor(schema: Joi.AnySchema<any>, toValidate?: (metadata: ArgumentMetadata) => boolean);
    transform(value: any, metadata: ArgumentMetadata): any;
}
