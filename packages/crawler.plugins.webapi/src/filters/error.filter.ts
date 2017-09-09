import { Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { HttpException } from "@nestjs/core";

@Catch(HttpException)
export class CustomExceptionFilter implements ExceptionFilter {
    public catch(exception: HttpException, response) {
        response.status(200).send({
            code: exception.getStatus(),
            error: exception.getResponse()
        });
    }
}
