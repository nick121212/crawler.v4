import { HttpException } from '@nestjs/core';
import { HttpStatus, Pipe, PipeTransform, ArgumentMetadata } from '@nestjs/common';
import * as Joi from "joi";

@Pipe()
export class JoiValidatorPipe implements PipeTransform {
    constructor(
        private readonly schema: Joi.AnySchema,
        private readonly toValidate = (metadata: ArgumentMetadata) => true) { }

    public transform(value: any, metadata: ArgumentMetadata) {
        if (!this.toValidate(metadata)) {
            return value;
        }

        const { error } = Joi.validate(value, this.schema);

        if (error) {
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
        return value;
    }
}